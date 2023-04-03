<template>
  <Overlay v-if="showAppLoadingWithDelay" class="z-max-9">
    <Spinner class="parent-center absolute w-20" />
  </Overlay>
</template>

<script setup lang="ts">
  import { computedAsync, promiseTimeout } from '@vueuse/core';

  const { showAppLoading } = storeToRefs(useAppStore());

  // Delay to avoid showing/hiding this in a short amount of time
  const showAppLoadingWithDelay = computedAsync(async () => {
    await promiseTimeout(showAppLoading.value ? 500 : 0);
    return showAppLoading.value;
  }, false);
</script>
