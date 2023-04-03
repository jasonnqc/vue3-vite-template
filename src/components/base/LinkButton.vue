<template>
  <div
    v-if="disabled"
    class="cursor-not-allowed"
    :class="[baseClass, displayClass, sizeClass, themeClass]"
  >
    <slot />
  </div>
  <a
    v-else
    role="button"
    :class="[baseClass, displayClass, effectClass, sizeClass, themeClass, themeHoverClass]"
    ><slot
  /></a>
</template>

<script setup lang="ts">
  import type { ButtonSize, ButtonTheme } from '@/composables/useButtonStyle';

  export interface Props {
    theme?: ButtonTheme;
    size?: ButtonSize;
    block?: boolean;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    theme: 'silver',
    size: 'medium',
    block: false,
  });

  const { theme, size, block } = toRefs(props);

  const { baseClass, displayClass, effectClass, sizeClass, themeClass, themeHoverClass } =
    useButtonStyle({
      theme,
      size,
      block,
    });
</script>
