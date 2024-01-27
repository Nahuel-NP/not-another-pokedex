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
    class="w-full bg-teal-500 flex flex-col justify-between max-w-xs rounded-xl pt-5 pb-4 px-2 cursor-pointer hover:scale-105 transition-all hover:bg-teal-400 relative"
    @click="showDetails(pokemon)"
  >
    <p class="absolute text-xs top-1 right-2 text-white">#{{ pokemon.id }}</p>
    <h4 class="text-white text-base  capitalize text-center font-bold">{{ pokemon.name }}</h4>
    <p class="flex gap-2 text-gray-800 justify-center">
      <span v-for="pokemonType in pokemon.types" :key="pokemon.name + pokemonType.type.name">{{
        pokemonType.type.name
      }}</span>
    </p>
    <img
      :src="pokemon.sprites.other?.dream_world.front_default !== null ? pokemon.sprites.other?.dream_world.front_default:
      pokemon.sprites.other?.['official-artwork'].front_default"
      :style="{ viewTransitionName: pokemon.name }"
      class="w-full aspect-square my-1"
      loading="lazy"
      :alt="`pokemon ${pokemon.name}`"
    />
    <p class="text-center ">weight: {{ pokemon.weight }} lbs.</p>
  </div>
</template>
