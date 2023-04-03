<template>
  <img
    ref="image"
    :src="instant ? src : dataSrc"
    class="block"
    :class="{
      'transition-opacity duration-300 ease-in': !instant,
      'opacity-0': !instant && !isLoaded,
    }"
    :style="{ aspectRatio }"
    :alt="alt"
  />
</template>

<script setup lang="ts">
  import { useIntersectionObserver, watchOnce } from '@vueuse/core';

  export interface Props {
    src: string;
    aspectRatio: number;
    instant?: boolean;
    alt?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    instant: false,
    alt: (props) => props.src.substring(props.src.lastIndexOf('/') + 1),
  });

  const dataSrc = ref('');
  const isLoaded = ref(false);
  const image = ref<HTMLImageElement | null>(null);

  if (!props.instant) {
    const { stop } = useIntersectionObserver(image, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        dataSrc.value = props.src;
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
