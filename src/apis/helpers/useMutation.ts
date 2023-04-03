import type { EventHookOn } from '@vueuse/core';
import { createEventHook } from '@vueuse/core';
import type { AxiosError } from 'axios';
import type { CacheAxiosResponse, CacheUpdater } from 'axios-cache-interceptor';
import { omit } from 'lodash';
import { storeToRefs } from 'pinia';

import { useAppStore } from '@/stores/useAppStore';
import type { KeyValue } from '@/types/shared';

import { useAxiosInstance } from './useAxiosInstance';
import type { StrictUseCacheAxiosReturn } from './useCacheAxios';
import { useCacheAxios } from './useCacheAxios';

export type UseMutationMethod = 'post' | 'put' | 'patch' | 'delete';

export type UseMutationPayload = KeyValue<any>;

export interface UseMutationOptions {
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
}

export interface UseMutationArgs {
  /**
   * Endpoint, will append to base API url.
   */
  url: string;

  /**
   * Request method, can be either POST, PUT, PATCH or DELETE.
   *
   * @default 'post'
   */
  method?: UseMutationMethod;

  /**
   * Request options, see {@link UseMutationOptions}.
   */
  options?: UseMutationOptions;

  /**
   * Used to update update or delete related request caches.
   *
   * @see https://axios-cache-interceptor.js.org/#/pages/per-request-configuration?id=cacheupdate
   */
  cacheUpdate?: CacheUpdater<any, any>;
}

export interface UseMutationReturn<M>
  extends Omit<StrictUseCacheAxiosReturn<M, CacheAxiosResponse<M>, any>, 'execute'> {
  /**
   * Execute the mutation.
   */
  mutate: (payload?: UseMutationPayload) => void;

  /**
   * Callback when the request has done.
   */
  onDone: EventHookOn<CacheAxiosResponse<M> | undefined>;

  /**
   * Callback when the request has error.
   */
  onError: EventHookOn<AxiosError<M, any>>;
}

export function useMutation<M = any>(args: UseMutationArgs): UseMutationReturn<M> {
  const { t } = useI18n();
  const { axiosCacheInstance } = useAxiosInstance();

  const { url, cacheUpdate } = args;

  const options: UseMutationOptions = {
    delay: 0,
    shallow: true,
    useAppLoading: false,
    useAppError: false,
    ...args.options,
  };

  const cudResult = createEventHook<CacheAxiosResponse<M> | undefined>();
  const cudError = createEventHook<AxiosError<M, any>>();

  const ctxAxios = useCacheAxios<M>(
    url,
    {
      method: args.method || 'post',
      cache: {
        update: cacheUpdate,
      },
    },
    axiosCacheInstance.value,
    { immediate: false, shallow: options.shallow, delay: options.delay },
  );

  const mutate = (data?: UseMutationPayload) => ctxAxios.execute({ data });

  const { showAppLoading, appError } = storeToRefs(useAppStore());

  watch([ctxAxios.isFinished, ctxAxios.response], ([isFinished, response]) => {
    if (isFinished) {
      cudResult.trigger(response);
    }
  });

  watch(ctxAxios.error, (error) => {
    if (error) {
      cudError.trigger(error);

      if (options.useAppError) {
        appError.value = {
          title: t('error.general'),
          messages: [error.code + '', error.message],
        };
      }
    }
  });

  if (options.useAppLoading) {
    watch(ctxAxios.isLoading, (isLoading) => {
      showAppLoading.value = isLoading;
    });
  }

  return {
    mutate,
    onDone: cudResult.on,
    onError: cudError.on,
    ...omit(ctxAxios, 'execute', 'then'),
  };
}
