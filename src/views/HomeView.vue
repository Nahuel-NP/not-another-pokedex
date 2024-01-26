<script lang="ts" setup>
import { ref } from 'vue'
import pokeApi from '@/api/pokeApi'
import type { PokeResponse, Pokemon } from '@/interfaces/pokeapi'
import { getPokemonInfo } from '../utils/getPokemon'
import PokemonCard from '@/components/PokemonCard.vue'
import LoaderBall from '@/components/shared/LoaderBall.vue'
import { useQuery } from '@tanstack/vue-query'

const pokemons = ref<Pokemon[]>([])

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

  pokemons.value = results
  console.log(pokemons.value)
  return pokemons
}

const { data, isFetching } = useQuery({
  queryKey: ['pokemons'],
  queryFn: getPokemons,
  staleTime: 60 * 1000 * 10 //10 minutos
})
</script>

<template>
  <main class="min-h-screen flex flex-col justify-center items-center">
    <div
      class="fixed top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(teal,#00091d_1px)] bg-[size:20px_20px]"
    ></div>
    <div
      v-if="!isFetching"
      class="grid px-4 container grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 w-full place-items-center"
    >
      <PokemonCard v-for="pokemon in data" :key="pokemon.id" :pokemon="pokemon" />
    </div>

    <LoaderBall v-else />
  </main>
</template>
