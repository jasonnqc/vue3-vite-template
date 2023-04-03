<template>
  <Modal
    v-if="appError"
    :title="appError.title"
    class="w-150"
    overlay-class="z-max-8"
    mask-closable
    @close="appError = null"
  >
    <div class="flex flex-col gap-4">
      <p v-for="(message, x) in appError.messages" :key="x">{{ message }}</p>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  const { appError } = storeToRefs(useAppStore());
</script>
