<script setup lang="ts">
import { computed } from 'vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'

const props = defineProps<{
  handleFilter: (event: any) => void
  handleResetFilter: () => void
  isFiltering: boolean
  tempName: string
}>()

const emit = defineEmits<{
  (e: 'update-input', value: string): void
}>()

const completedInputModel = computed({
  // getter
  get() {
    return props.tempName
  },
  // setter
  set(newValue: string) {
    emit('update-input', newValue)
  }
})
</script>

<template>
  <form class="flex items-center max-w-lg px-4 mx-auto mb-8" @reset="handleResetFilter" @submit="handleFilter">
    <div class="relative w-full">
      <input type="text" id="simple-search"
        class="bg-gray-900 border border-gray-300 text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full ps-4 p-2.5"
        placeholder="Ingresa el nombre del pokemon" required v-model="completedInputModel" />
    </div>
    <button aria-label="Reset" v-if="isFiltering" type="reset"
      class="p-2.5 ms-2 text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-1 focus:outline-none focus:ring-red-300">
      Reset
    </button>
    <button type="submit"
      class="p-2.5 ms-2 text-sm font-medium text-white bg-teal-700 rounded-lg border border-teal-700 hover:bg-teal-800 focus:ring-1 focus:outline-none focus:ring-teal-300">
      <SearchIcon />
      <span class="sr-only">Buscar</span>
    </button>
  </form>
</template>
