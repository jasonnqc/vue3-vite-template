import type { Ref } from 'vue';

import type { KeyValue } from '@/types/shared';

const sizeClassMap: KeyValue<string> = {
  small: 'px-4 py-2 text-xl',
  medium: 'px-8 py-4 text-2xl',
};

const themeClassMap: KeyValue<string> = {
  silver: 'text-white bg-linear-silver border border-transparent',
  gold: 'text-white bg-linear-gold border border-transparent',
};

const themeHoverClassMap: KeyValue<string> = {
  silver: 'hover:border-white hover:text-shadow-white',
  gold: 'hover:border-gold hover:text-shadow-white',
};

export type ButtonTheme = 'unset' | 'silver' | 'gold';

export type ButtonSize = 'unset' | 'small' | 'medium';

export interface UseButtonStyleInputs {
  theme: Ref<ButtonTheme>;
  size: Ref<ButtonSize>;
  block: Ref<boolean>;
}

export function useButtonStyle(inputs: UseButtonStyleInputs) {
  const baseClass = 'relative bg-origin-border text-center font-bold select-none';

  const effectClass = 'transition duration-200';

  const displayClass = computed(() => (inputs.block.value ? 'block' : 'inline-block'));

  const sizeClass = computed(() => sizeClassMap[inputs.size.value]);

  const themeClass = computed(() => themeClassMap[inputs.theme.value]);

  const themeHoverClass = computed(() => themeHoverClassMap[inputs.theme.value]);

  return {
    baseClass,
    effectClass,
    displayClass,
    sizeClass,
    themeClass,
    themeHoverClass,
  };
}
