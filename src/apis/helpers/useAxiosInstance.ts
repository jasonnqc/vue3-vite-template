import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axios from 'axios';
import type { AxiosCacheInstance } from 'axios-cache-interceptor';
import { setupCache } from 'axios-cache-interceptor';

export function useAxiosInstance() {
  const axiosBaseConfig = computed<CreateAxiosDefaults>(() => ({
    baseURL: import.meta.env.QUEST_API_URL,
    timeout: 1e4,
  }));

  const axiosBaseInstance = computed<AxiosInstance>(() => axios.create(axiosBaseConfig.value));

  const axiosCacheInstance = computed<AxiosCacheInstance>(() =>
    setupCache(axios.create(axiosBaseConfig.value)),
  );

  return {
    axiosBaseConfig,
    axiosBaseInstance,
    axiosCacheInstance,
  };
}
