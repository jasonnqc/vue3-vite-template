import type { AppError } from '@/types/shared';

export const useAppStore = defineStore('app', () => {
  const showAppLoading = ref(false);
  const appError = ref<AppError | null>(null);
  return { showAppLoading, appError };
});
