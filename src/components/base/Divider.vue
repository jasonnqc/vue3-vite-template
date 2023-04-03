<template>
  <div v-if="vertical" class="relative flex h-full w-2.5 items-center justify-center">
    <div className="h-full border border-white" />
    <div className="absolute w-2.5 h-2.5 bg-white transform rotate-45" />
  </div>
  <div v-else class="relative flex h-2.5 w-full items-center justify-center">
    <div className="w-full border border-white" />
    <div className="absolute w-2.5 h-2.5 bg-white transform rotate-45" />
  </div>
</template>

<script setup lang="ts">
  export interface Props {
    vertical?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    vertical: false,
  });
</script>
