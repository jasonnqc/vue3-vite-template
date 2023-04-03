<template>
  <div
    v-if="disabled"
    class="cursor-not-allowed"
    :class="[baseClass, displayClass, sizeClass, themeClass]"
  >
    <slot />
  </div>
  <RouterLink
    v-else
    role="button"
    :to="to"
    :replace="replace"
    :class="[baseClass, displayClass, effectClass, sizeClass, themeClass, themeHoverClass]"
    ><slot
  /></RouterLink>
</template>

<script setup lang="ts">
  import type { RouteLocationRaw } from 'vue-router/auto';

  import type { ButtonSize, ButtonTheme } from '@/composables/useButtonStyle';

  export interface Props {
    to: RouteLocationRaw;
    replace?: boolean;

    theme?: ButtonTheme;
    size?: ButtonSize;
    block?: boolean;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    replace: false,

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
