<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import pokeApi from '@/api/pokeApi'
import type { PokeResponse } from '@/interfaces/pokeapi'
import { getPokemonInfo } from '../utils/getPokemonByName'
import PokemonCard from '@/components/PokemonCard.vue'
import LoaderBall from '@/components/shared/LoaderBall.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import NextPageIcon from '@/components/icons/NextPagIcon.vue'
import PrevPageIcon from '@/components/icons/PrevPagIcon.vue'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'

const nameToSearch = ref('')
const getPokemons = async (page: Ref<number>, limit: number = 24) => {
  const { data } = await pokeApi.get<PokeResponse>('/pokemon', {
    params: {
      limit,
      offset: (page.value - 1) * limit
    }
  })
  console.log({ data })
  const promises = data.results.map(async (pokemon) => {
    const pokemonResponse = await getPokemonInfo(pokemon.name)
    return pokemonResponse
  })

  const [...results] = await Promise.all(promises)

  const totalPages = Math.ceil(data.count / limit)

  return {
    ...data,
    totalPages,
    results
  }
}

const searchByName = async (event: any) => {
  event.preventDefault()
  const data = await getPokemonInfo(nameToSearch.value.toLowerCase())
  /*   if (data) {
    pokemons.value = [data]
    return
  }
  pokemons.value = [] */
}

const page = ref(1)

const { data, isFetching, isPlaceholderData } = useQuery({
  queryKey: ['pokemons', page],
  queryFn: () => getPokemons(page),
  staleTime: 60 * 1000 * 10, //10 minutos
  placeholderData: keepPreviousData
})

const prevPage = () => {
  page.value = Math.max(page.value - 1, 1)
}

const nextPage = () => {
  if (!isPlaceholderData.value) {
    page.value = page.value + 1
  }
}
</script>

<template>
  <main class="min-h-screen py-8">
    <div
      class="fixed top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(teal,#00091d_1px)] bg-[size:20px_20px]"
    ></div>

    <form class="max-w-md mx-auto mb-8" @submit="searchByName">
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full p-4 ps-10 text-sm text-white border border-gray-300 rounded-lg bg-gray-700 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Search Pokemon"
          required
          v-model="nameToSearch"
        />
        <button
          type="submit"
          class="text-white absolute end-2.5 bottom-2.5 bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
        >
          Buscar
        </button>
      </div>
    </form>

    <div
      v-if="!isFetching"
      class="grid mx-auto px-4 container grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 w-full place-items-center"
    >
      <PokemonCard v-for="pokemon in data?.results" :key="pokemon.id" :pokemon="pokemon" />
    </div>

    <LoaderBall v-else />

    <nav aria-label="Page navigation" class="flex justify-center mt-8">
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
