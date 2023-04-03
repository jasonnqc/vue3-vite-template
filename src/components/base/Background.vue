<template>
  <div ref="background" class="relative">
    <div
      class="parent-fill absolute z-0"
      :class="[
        imageClass,
        {
          'transition-opacity duration-300 ease-in': !instant,
          'opacity-0': !instant && !isLoaded,
        },
      ]"
      :style="{ backgroundImage: `url(${instant ? src : dataSrc})` }"
    />
    <div class="relative">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useIntersectionObserver, watchOnce } from '@vueuse/core';

  import type { CSSClassAttribute } from '@/types/shared';

  export interface Props {
    src: string;
    instant?: boolean;
    imageClass?: CSSClassAttribute;
  }

  const props = withDefaults(defineProps<Props>(), {
    instant: false,
    imageClass: 'bg-cover bg-fixed bg-center bg-no-repeat',
  });

  const dataSrc = ref('');
  const isLoaded = ref(false);
  const image = ref<HTMLImageElement | null>(null);
  const background = ref<HTMLDivElement | null>(null);

  if (!props.instant) {
    const { stop } = useIntersectionObserver(background, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        dataSrc.value = props.src;
        image.value = new Image();
        image.value.src = props.src;
        stop();
      }
    });

    watchOnce(image, (img) => {
      if (img) {
        img.onload = () => {
          isLoaded.value = true;
        };
      }
    });
  }
</script>
