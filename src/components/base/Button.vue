<template>
  <button
    :class="[
      baseClass,
      displayClass,
      sizeClass,
      themeClass,
      {
        'cursor-not-allowed': isDisabled,
        [effectClass]: !isDisabled,
        [themeHoverClass]: !isDisabled,
      },
    ]"
    :disabled="isDisabled"
  >
    <template v-if="loading">
      <div class="parent-fill absolute bg-black/50">
        <Spinner class="parent-center absolute w-6" />
      </div>
      <div class="invisible"><slot /></div>
    </template>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
  import { has } from 'lodash';

  import type { ButtonSize, ButtonTheme } from '@/composables/useButtonStyle';

  export interface Props {
    theme?: ButtonTheme;
    size?: ButtonSize;
    block?: boolean;
    loading?: boolean;
  }

  const attrs = useAttrs();

  const props = withDefaults(defineProps<Props>(), {
    theme: 'silver',
    size: 'medium',
    block: false,
    loading: false,
  });

  const { theme, size, block } = toRefs(props);

  const isDisabled = computed(() => has(attrs, 'disabled') || props.loading);

  const { baseClass, displayClass, effectClass, sizeClass, themeClass, themeHoverClass } =
    useButtonStyle({
      theme,
      size,
      block,
    });
</script>
