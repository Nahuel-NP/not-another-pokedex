<script lang="ts" setup>
import { ref } from 'vue'
import pokeApi from '@/api/pokeApi'
import type { PokeResponse, Pokemon } from '@/interfaces/pokeapi'
import { getPokemonInfo } from '../utils/getPokemon'
import PokemonCard from '@/components/PokemonCard.vue'

const pokemons = ref<Pokemon[]>([])
const isLoading = ref(true)

const getPokemons = async () => {
  const { data } = await pokeApi.get<PokeResponse>('/pokemon', {
    params: {
      limit: 24
    }
  })

  const promises = data.results.map(async (pokemon) => {
    const pokemonResponse = await getPokemonInfo(pokemon.name)
    return pokemonResponse
  })

  const [...results] = await Promise.all(promises)
  isLoading.value = false
  pokemons.value = results
}


getPokemons()
</script>

<template>
  <main class=" min-h-screen flex flex-col justify-center items-center ">
    <div class="fixed top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(teal,#00091d_1px)] bg-[size:20px_20px]"></div>    <div v-if="!isLoading" class="grid px-4 container grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 w-full place-items-center">
      <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>
    <div v-else>
      <p class="text-white">Loading...</p>
    </div>
  </main>
</template>
