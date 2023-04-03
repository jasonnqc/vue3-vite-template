/***************************************************************************************************
Forked from @vueuse/integrations/useAxios
***************************************************************************************************/

import type { Ref, ShallowRef } from 'vue';
import { isString, promiseTimeout, until } from '@vueuse/core';
import type { AxiosError, CancelTokenSource } from 'axios';
import axios from 'axios';
import type {
  AxiosCacheInstance,
  CacheAxiosResponse,
  CacheRequestConfig,
} from 'axios-cache-interceptor';
import { setupCache } from 'axios-cache-interceptor';

import { useAxiosInstance } from './useAxiosInstance';

type RawCacheRequestConfig<D> = Partial<CacheRequestConfig<D>>;

export interface UseCacheAxiosReturn<T, R = CacheAxiosResponse<T>, D = any> {
  /**
   * Axios Response.
   */
  response: ShallowRef<R | undefined>;

  /**
   * Axios response data.
   */
  data: Ref<T | undefined>;

  /**
   * Indicates if the request has finished.
   */
  isFinished: Ref<boolean>;

  /**
   * Indicates if the request is currently loading.
   */
  isLoading: Ref<boolean>;

  /**
   * Indicates if the request was canceled.
   */
  isAborted: Ref<boolean>;

  /**
   * Any errors that may have occurred.
   */
  error: ShallowRef<AxiosError<T, D> | undefined>;

  /**
   * Aborts the current request.
   */
  abort: (message?: string | undefined) => void;
}
export interface StrictUseCacheAxiosReturn<T, R, D> extends UseCacheAxiosReturn<T, R, D> {
  /**
   * Manually call the axios request.
   */
  execute: (
    url?: string | RawCacheRequestConfig<D>,
    config?: RawCacheRequestConfig<D>,
  ) => PromiseLike<StrictUseCacheAxiosReturn<T, R, D>>;
}
export interface EasyUseCacheAxiosReturn<T, R, D> extends UseCacheAxiosReturn<T, R, D> {
  /**
   * Manually call the axios request.
   */
  execute: (
    url: string,
    config?: RawCacheRequestConfig<D>,
  ) => PromiseLike<EasyUseCacheAxiosReturn<T, R, D>>;
}
export interface UseCacheAxiosOptions {
  /**
   * Will automatically run axios request when `useCacheAxios` is used.
   *
   */
  immediate?: boolean;
  /**
   * Use shallowRef.
   *
   * @default true
   */
  shallow?: boolean;
  /**
   * Use for testing purpose.
   *
   * @default 0
   */
  delay?: number;
}
type OverallUseCacheAxiosReturn<T, R, D> =
  | StrictUseCacheAxiosReturn<T, R, D>
  | EasyUseCacheAxiosReturn<T, R, D>;

export function useCacheAxios<T = any, R = CacheAxiosResponse<T>, D = any>(
  url: string,
  config?: RawCacheRequestConfig<D>,
  options?: UseCacheAxiosOptions,
): StrictUseCacheAxiosReturn<T, R, D> & PromiseLike<StrictUseCacheAxiosReturn<T, R, D>>;
export function useCacheAxios<T = any, R = CacheAxiosResponse<T>, D = any>(
  url: string,
  instance?: AxiosCacheInstance,
  options?: UseCacheAxiosOptions,
): StrictUseCacheAxiosReturn<T, R, D> & PromiseLike<StrictUseCacheAxiosReturn<T, R, D>>;
export function useCacheAxios<T = any, R = CacheAxiosResponse<T>, D = any>(
  url: string,
  config: RawCacheRequestConfig<D>,
  instance: AxiosCacheInstance,
  options?: UseCacheAxiosOptions,
): StrictUseCacheAxiosReturn<T, R, D> & PromiseLike<StrictUseCacheAxiosReturn<T, R, D>>;
export function useCacheAxios<T = any, R = CacheAxiosResponse<T>, D = any>(
  config?: RawCacheRequestConfig<D>,
): EasyUseCacheAxiosReturn<T, R, D> & PromiseLike<EasyUseCacheAxiosReturn<T, R, D>>;
export function useCacheAxios<T = any, R = CacheAxiosResponse<T>, D = any>(
  instance?: AxiosCacheInstance,
): EasyUseCacheAxiosReturn<T, R, D> & PromiseLike<EasyUseCacheAxiosReturn<T, R, D>>;
export function useCacheAxios<T = any, R = CacheAxiosResponse<T>, D = any>(
  config?: RawCacheRequestConfig<D>,
  instance?: AxiosCacheInstance,
): EasyUseCacheAxiosReturn<T, R, D> & PromiseLike<EasyUseCacheAxiosReturn<T, R, D>>;

/**
 * Wrapper for axios.
 *
 * @see https://vueuse.org/useCacheAxios
 */
export function useCacheAxios<T = any, R = CacheAxiosResponse<T>, D = any>(
  ...args: any[]
): OverallUseCacheAxiosReturn<T, R, D> & PromiseLike<OverallUseCacheAxiosReturn<T, R, D>> {
  const { axiosBaseConfig } = useAxiosInstance();
  const url: string | undefined = typeof args[0] === 'string' ? args[0] : undefined;
  const argsPlaceholder = isString(url) ? 1 : 0;
  let defaultConfig: RawCacheRequestConfig<D> = {};
  let instance: AxiosCacheInstance = setupCache(axios.create(axiosBaseConfig.value));
  let options: UseCacheAxiosOptions = { immediate: !!argsPlaceholder, shallow: true, delay: 0 };

  const isAxiosInstance = (val: any) => !!val?.request;

  if (args.length > 0 + argsPlaceholder) {
    /**
     * Unable to use `instanceof` here because of (https://github.com/axios/axios/issues/737)
     * so instead we are checking if there is a `request` on the object to see if it is an
     * axios instance
     */
    if (isAxiosInstance(args[0 + argsPlaceholder])) instance = args[0 + argsPlaceholder];
    else defaultConfig = args[0 + argsPlaceholder];
  }

  if (args.length > 1 + argsPlaceholder) {
    if (isAxiosInstance(args[1 + argsPlaceholder])) instance = args[1 + argsPlaceholder];
  }
  if (
    (args.length === 2 + argsPlaceholder && !isAxiosInstance(args[1 + argsPlaceholder])) ||
    args.length === 3 + argsPlaceholder
  )
    options = args[args.length - 1];

  const response = shallowRef<CacheAxiosResponse<T>>();
  const data = options.shallow ? shallowRef<T>() : ref<T>();
  const isFinished = ref(false);
  const isLoading = ref(false);
  const isAborted = ref(false);
  const error = shallowRef<AxiosError<T>>();

  const cancelToken: CancelTokenSource = axios.CancelToken.source();
  const abort = (message?: string) => {
    if (isFinished.value || !isLoading.value) return;

    cancelToken.cancel(message);
    isAborted.value = true;
    isLoading.value = false;
    isFinished.value = false;
  };
  const loading = (loading: boolean) => {
    isLoading.value = loading;
    isFinished.value = !loading;
  };
  const waitUntilFinished = () =>
    new Promise<OverallUseCacheAxiosReturn<T, R, D>>((resolve, reject) => {
      until(isFinished)
        .toBe(true)
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        .then(() => resolve(result))
        .catch(reject);
    });
  const then: PromiseLike<OverallUseCacheAxiosReturn<T, R, D>>['then'] = (
    onFulfilled,
    onRejected,
  ) => waitUntilFinished().then(onFulfilled, onRejected);
  const execute: OverallUseCacheAxiosReturn<T, R, D>['execute'] = async (
    executeUrl: string | RawCacheRequestConfig<D> | undefined = url,
    config: RawCacheRequestConfig<D> = {},
  ) => {
    error.value = undefined;
    const _url = typeof executeUrl === 'string' ? executeUrl : url ?? '';
    loading(true);
    if (options.delay) {
      await promiseTimeout(options.delay);
    }
    instance(_url, {
      ...defaultConfig,
      ...(typeof executeUrl === 'object' ? executeUrl : config),
      cancelToken: cancelToken.token,
    })
      .then((r: any) => {
        response.value = r;
        data.value = r.data;
      })
      .catch((e: any) => {
        error.value = e;
      })
      .finally(() => loading(false));
    return { then };
  };
  if (options.immediate && url) (execute as StrictUseCacheAxiosReturn<T, R, D>['execute'])();

  const result = {
    response,
    data,
    error,
    isFinished,
    isLoading,
    isAborted,
    abort,
    execute,
  } as OverallUseCacheAxiosReturn<T, R, D>;

  return {
    ...result,
    then,
  };
}
