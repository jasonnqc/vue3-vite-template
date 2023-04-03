<template>
  <Teleport to="body">
    <div class="parent-fill fixed" v-bind="$attrs">
      <div v-if="mask" class="parent-fill absolute bg-black/50" @click="$emit('mask-click')" />
      <slot />
    </div>
  </Teleport>
</template>

<script lang="ts">
  export default {
    inheritAttrs: false,
  };
</script>

<script setup lang="ts">
  export interface Props {
    mask?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    mask: true,
  });

  defineEmits(['mask-click']);
</script>
