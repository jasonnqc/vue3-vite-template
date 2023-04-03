import type { EventHookOn } from '@vueuse/core';
import { createEventHook } from '@vueuse/core';
import type { AxiosError } from 'axios';
import type { CacheAxiosResponse, CacheUpdater } from 'axios-cache-interceptor';
import { noop, omit } from 'lodash';
import { storeToRefs } from 'pinia';
import type { StringifyOptions } from 'query-string';
import qs from 'query-string';

import { useAppStore } from '@/stores/useAppStore';
import type { KeyValue } from '@/types/shared';

import { useAxiosInstance } from './useAxiosInstance';
import type { StrictUseCacheAxiosReturn } from './useCacheAxios';
import { useCacheAxios } from './useCacheAxios';
import { applyRouteData, getCacheId } from './utils';

export type UseQueryQueryParams = KeyValue<any>;

export type UseQueryRouteParams = KeyValue<string | number | undefined>;
export interface UseQueryCache {
  /**
   * Enable request cache.
   *
   * @default true
   */
  enabled: boolean;

  /**
   * The time until the cached value is expired in milliseconds.
   *
   * @see https://axios-cache-interceptor.js.org/#/pages/per-request-configuration?id=cachettl
   */
  ttl?: number;

  /**
   * Used to update the request cache or delete other ones.
   *
   * @see https://axios-cache-interceptor.js.org/#/pages/per-request-configuration?id=cacheupdate
   */
  update?: CacheUpdater<any, any>;
}

export interface UseQueryOptions {
  /**
   * Will not automatically run axios request when `useQuery` is used,
   * you can use `fetch` function return from it to do so.
   *
   * @default false
   */
  lazy?: boolean;

  /**
   * A number in millisecond to delay the request, used for testing purpose.
   *
   * @default 0
   */
  delay?: number;

  /**
   * Use ShallowRef on the return data instead of Ref.
   *
   * @default true
   */
  shallow?: boolean;

  /**
   * Whether to show the app global loading modal when the request is pending.
   *
   * @default false
   */
  useAppLoading?: boolean;

  /**
   * Whether to show the app global error modal when the request has problem.
   *
   * @default false
   */
  useAppError?: boolean;

  /**
   * Cache config, see {@link UseQueryCache}.
   */
  cache?: UseQueryCache;
}

export interface UseQueryParams {
  /**
   * This will be converted into request query string.
   *
   * @example
   *
   * { page: 1, filter: 'keyword' } will become '?page=1&filter=keyword'.
   */
  query?: UseQueryQueryParams;

  /**
   * This will be converted into request route data.
   *
   * @example
   *
   * { userId: 1, titleId: 2 } and '/user/[userId]/[titleId]' will become 'user/1/2'.
   */
  route?: UseQueryRouteParams;
}

export interface UseQueryFilter<P> {
  /**
   * Used to pass in query string or route data to filter the query
   */
  payload?: P;

  /**
   * Cache uses url and query string as its key. Therefore, to avoid some duplicated cache data
   * with different cache key, providing default payload is recommended.
   *
   * @example
   *
   * Provide default { page: 1 } will treat '/user' and '/user?page=1' [as] the same key.
   */
  default?: Partial<P>;

  /**
   * A mapper function to convert payload into actual query and route params.
   */
  resolve: (payload: P) => UseQueryParams;

  /**
   * Options for serializing query params
   */
  queryOptions?: StringifyOptions;
}

export interface UseQueryArgs<P> {
  /**
   * Endpoint, will append to base API url.
   */
  url: string;

  /**
   * Request filter, see {@link UseQueryFilter}.
   */
  filter?: UseQueryFilter<P>;

  /**
   * Request options, see {@link UseQueryOptions}.
   */
  options?: UseQueryOptions;
}

export interface UseQueryReturn<M, P>
  extends Omit<StrictUseCacheAxiosReturn<M, CacheAxiosResponse<M>, any>, 'execute'> {
  /**
   * When {@link UseQueryOptions.lazy | options.lazy} is set to `true`,
   * this will be used to make the actual request later on.
   *
   */
  fetch: (payload?: P) => void;

  /**
   * When {@link UseQueryOptions.lazy | options.lazy} is set to `false`,
   * this will be used to make the additional requests after the auto fetch.
   *
   */
  refetch: (payload?: P) => void;

  /**
   * Callback when the request has done.
   */
  onResult: EventHookOn<CacheAxiosResponse<M> | undefined>;

  /**
   * Callback when the request has error.
   */
  onError: EventHookOn<AxiosError<M, any>>;
}

export function useQuery<M = any, P = any>(args: UseQueryArgs<P>): UseQueryReturn<M, P> {
  const { t } = useI18n();
  const { axiosCacheInstance } = useAxiosInstance();

  const produceAxiosConfig = (filter?: UseQueryFilter<P>) => {
    const params = filter?.payload ? filter.resolve(filter.payload) : undefined;
    const url = params?.route ? applyRouteData(args.url, params.route) : args.url;
    const id = getCacheId(url, params?.query, filter?.default);
    return {
      id,
      url,
      params: params?.query,
      ...(filter?.queryOptions
        ? {
            paramsSerializer: {
              serialize: (p: Record<string, any>) => qs.stringify(p, filter.queryOptions),
            },
          }
        : {}),
      cache: {
        ttl: options.cache?.ttl,
        override: !options.cache?.enabled,
        update: {
          ...(!options.cache?.enabled && { [id]: 'delete' }),
          ...options.cache?.update,
        },
      },
    };
  };

  const options: UseQueryOptions = {
    delay: 0,
    lazy: false,
    shallow: true,
    cache: {
      enabled: true,
    },
    useAppLoading: false,
    useAppError: false,
    ...args.options,
  };

  const fetchResult = createEventHook<CacheAxiosResponse<M> | undefined>();
  const fetchError = createEventHook<AxiosError<M, any>>();

  const config = produceAxiosConfig(args.filter);
  const ctxAxios = useCacheAxios<M>(config.url, config, axiosCacheInstance.value, {
    immediate: !options.lazy,
    shallow: options.shallow,
    delay: options.delay,
  });

  const doFetch = (payload?: P) => {
    const config = produceAxiosConfig(args.filter && { ...args.filter, payload });
    ctxAxios.execute(config.url, config);
  };

  const fetch = options.lazy ? doFetch : () => noop();

  const refetch = options.lazy ? () => noop() : doFetch;

  const { showAppLoading, appError } = storeToRefs(useAppStore());

  watch([ctxAxios.isFinished, ctxAxios.response], ([isFinished, response]) => {
    if (isFinished) {
      fetchResult.trigger(response);
    }
  });

  watch(ctxAxios.error, (error) => {
    if (error) {
      fetchError.trigger(error);

      if (options.useAppError) {
        appError.value = {
          title: t('error.general'),
          messages: [error.code + '', error.message],
        };
      }
    }
  });

  if (options.useAppLoading) {
    watch(
      ctxAxios.isLoading,
      (isLoading) => {
        showAppLoading.value = isLoading;
      },
      { immediate: true },
    );
  }

  return {
    fetch,
    refetch,
    onResult: fetchResult.on,
    onError: fetchError.on,
    ...omit(ctxAxios, 'execute', 'then'),
  };
}
