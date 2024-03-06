<script setup lang="ts">
import type { Pokemon } from '@/interfaces/pokeapi'
import { usePokemonStore } from '../stores/pokemonStore'
import { useTransition } from '@/utils/useTransition'

defineProps<{
  pokemon: Pokemon
}>()

const pokemonStore = usePokemonStore()
const { handleTransition } = useTransition()
const showDetails = (pokemon: Pokemon) => {
  pokemonStore.setActivePokemon(pokemon)
  handleTransition(`/pokemon/${pokemon.name}`)
}
</script>

<template>
  <div
    class="relative z-10 flex flex-col justify-between w-full max-w-[180px] px-2 pt-5 pb-4 transition-all bg-gray-800 cursor-pointer bg-opacity-60 rounded-xl hover:scale-105 hover:bg-teal-700"
    @click="showDetails(pokemon)"
  >
    <p class="absolute text-xs text-white top-1 right-2">#{{ pokemon.id }}</p>
    <h4 class="text-base font-bold text-center text-white capitalize">{{ pokemon.name }}</h4>
    <p class="flex justify-center gap-2 font-semibold text-gray-200 font-se">
      <span
        class="capitalize"
        v-for="pokemonType in pokemon.types"
        :key="pokemon.name + pokemonType.type.name"
        >{{ pokemonType.type.name }}</span
      >
    </p>
    <img
      :src="
        pokemon.sprites.other?.dream_world.front_default !== null
          ? pokemon.sprites.other?.dream_world.front_default
          : pokemon.sprites.other?.['official-artwork'].front_default
      "
      :style="{ viewTransitionName: pokemon.name }"
      class="w-full my-1 max-w-[110px] mx-auto aspect-square"
      loading="lazy"
      :alt="`pokemon ${pokemon.name}`"
    />
    <div
      class="absolute w-3/4 -translate-x-1/2 -translate-y-1/2 bg-teal-500 bg-opacity-25 rounded-full blur-md -z-10 aspect-square top-1/2 left-1/2"
    ></div>
    <p class="font-semibold text-center text-gray-300">Peso: {{ pokemon.weight }} lbs.</p>
  </div>
</template>
