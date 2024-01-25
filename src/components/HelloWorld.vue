<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
    <h1 class="text-white text-3xl font-bold">Jemersoft</h1>
    <p class="text-teal-600 text-xl font-semibold">{{msg}}</p>
</template>
