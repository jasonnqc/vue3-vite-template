<template>
  <Overlay
    v-if="isVisible"
    :class="overlayClass"
    :mask="mask"
    @mask-click="() => maskClosable && handleClose()"
  >
    <div
      class="parent-center absolute z-10 text-white"
      :class="{ 'bg-linear-silver': !transparent }"
      v-bind="$attrs"
    >
      <button v-if="closable" type="button" class="absolute top-0 right-0 p-4" @click="handleClose">
        <Icon name="close" class="h-3.5 w-3.5" />
      </button>
      <div :class="bodyClass">
        <template v-if="title">
          <h3 class="mb-5 text-3xl">{{ title }}</h3>
          <Divider class="mb-8" />
        </template>
        <slot :close="handleClose" />
      </div>
    </div>
  </Overlay>
</template>

<script lang="ts">
  export default {
    inheritAttrs: false,
  };
</script>

<script setup lang="ts">
  import type { CSSClassAttribute } from '@/types/shared';

  export interface Props {
    title?: string;
    visible?: boolean;
    closable?: boolean;
    mask?: boolean;
    maskClosable?: boolean;
    transparent?: boolean;
    overlayClass?: CSSClassAttribute;
    bodyClass?: CSSClassAttribute;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: '',
    visible: true,
    closable: true,
    mask: true,
    maskClosable: false,
    transparent: false,
    overlayClass: '',
    bodyClass: 'px-16 pb-11 pt-8 text-center',
  });

  const emit = defineEmits(['close', 'update:visible']);

  const isVisible = ref(props.visible);

  function handleClose() {
    if (!props.closable) return;
    isVisible.value = false;
    emit('update:visible', false);
    emit('close');
  }

  watch(
    () => props.visible,
    (value) => {
      isVisible.value = value;
    },
  );
</script>
