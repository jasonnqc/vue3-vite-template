<template>
  <svg aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
  export interface Props {
    name: string;
    prefix?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    prefix: 'icon',
  });

  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
