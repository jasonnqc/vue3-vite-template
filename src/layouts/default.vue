<template>
  <Background :src="imgBgMain" class="min-h-full w-full bg-career text-white">
    <div class="container mx-auto h-full">
      <main>
        <RouterView />
      </main>
    </div>
  </Background>
</template>

<script setup lang="ts">
  import imgBgMain from '@img/bg-main.jpg';
</script>
