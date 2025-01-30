<template>
  <nav aria-label="Page navigation" class="flex text-white justify-center mt-8" v-if="!isFiltering">
    <div class="flex items-center -space-x-px h-10 text-base">
      <button aria-label="prev" @click="$emit('prevPage')"
        class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <PrevPageIcon />
      </button>
      <button aria-label="current-page"
        class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        {{ page }}
      </button>
      <button aria-label="next" @click="$emit('nextPage')"
        class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span class="sr-only">Next</span>
        <NextPageIcon />
      </button>
    </div>
  </nav>
</template>
<script setup lang="ts">
import NextPageIcon from '@/components/icons/NextPagIcon.vue';
import PrevPageIcon from '@/components/icons/PrevPagIcon.vue';

defineProps<{
  page: number,
  isFiltering: boolean
}>()

defineEmits<{
  (e: 'nextPage'): void,
  (e: 'prevPage'): void
}>()

</script>