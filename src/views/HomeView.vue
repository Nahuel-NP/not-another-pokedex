<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { getPokemonInfo } from '../utils/getPokemonByName'
import PokemonCard from '@/components/PokemonCard.vue'
import LoaderBall from '@/components/shared/LoaderBall.vue'
import SearchForm from '@/components/home/SearchForm.vue'
import NextPageIcon from '@/components/icons/NextPagIcon.vue'
import PrevPageIcon from '@/components/icons/PrevPagIcon.vue'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'
import { getPokemons } from '../utils/getAllPokemons'

const searchByName = async (nameToSearch: Ref<string>) => {
  const data = await getPokemonInfo(nameToSearch.value.toLowerCase())
  console.log(data)
  return data
}

const page = ref(1)

const {
  data: allPokemons,
  isFetching,
  isPlaceholderData
} = useQuery({
  queryKey: ['pokemons', page],
  queryFn: () => getPokemons(page),
  staleTime: 60 * 1000 * 10, //10 minutos
  placeholderData: keepPreviousData
})

const nameToSearch = ref('')
const isFiltering = ref(false)
const tempName = ref('')

const {
  data: pokemonByName,
  isError,
  isFetching: isFetchigPokemon
} = useQuery({
  queryFn: () => searchByName(nameToSearch),
  queryKey: ['pokemon', nameToSearch],
  enabled: isFiltering,
  staleTime: 60 * 1000 * 10,
  retry: false
})

const prevPage = () => {
  page.value = Math.max(page.value - 1, 1)
}

const nextPage = () => {
  if (!isPlaceholderData.value) {
    page.value = page.value + 1
  }
}

const handleFilter = (event: SubmitEvent) => {
  event.preventDefault()
  if (tempName.value !== '') {
    isFiltering.value = true
    nameToSearch.value = tempName.value
  }
}

const handlerResetFilter = () => {
  isFiltering.value = false
  nameToSearch.value = ''
}

const onUpdateInput = (value: string) => {
  tempName.value = value
}
</script>

<template>
  <main class="min-h-screen py-8">
    <div
      class="fixed top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(teal,#00091d_1px)] bg-[size:20px_20px]"
    ></div>

    <SearchForm
      :handle-filter="handleFilter"
      :handle-reset-filter="handlerResetFilter"
      :is-filtering="isFiltering"
      :temp-name="tempName"
      @update-input="onUpdateInput"
    />

    <div v-if="pokemonByName" class="w-full">
      <PokemonCard :pokemon="pokemonByName" class="mx-auto max-w-60" />
    </div>
    <div
      v-if="!isFetching && !isFiltering"
      class="grid mx-auto px-4 container grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 w-full place-items-center"
    >
      <PokemonCard v-for="pokemon in allPokemons?.results" :key="pokemon.id" :pokemon="pokemon" />
    </div>

    <LoaderBall v-if="isFetching || isFetchigPokemon" />

    <div v-if="isError">
      <h2 class="text-white text-center text-2xl font-semibold">Pokemon no encontrado</h2>
    </div>

    <nav aria-label="Page navigation" class="flex justify-center mt-8" v-if="!isFiltering">
      <div class="flex items-center -space-x-px h-10 text-base">
        <button
          @click="prevPage()"
          class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <PrevPageIcon />
        </button>
        <button
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {{ page }}
        </button>
        <button
          @click="nextPage()"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span class="sr-only">Next</span>
          <NextPageIcon />
        </button>
      </div>
    </nav>
  </main>
</template>
