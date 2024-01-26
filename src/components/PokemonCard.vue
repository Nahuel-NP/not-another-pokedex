<script setup lang="ts">
import type { Pokemon } from '@/interfaces/pokeapi'
import { useRouter } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'

defineProps<{
  pokemon: Pokemon
}>()

const router = useRouter()

const showDetails = (pokemon: Pokemon) => {
  const pokemonStore = usePokemonStore()
  pokemonStore.setActivePokemon(pokemon)
  // @ts-ignore
  if (!document.startViewTransition) {
    router.push(`/pokemon/${pokemon.name}`)
    return
  }
  // @ts-ignore
  document.startViewTransition(() => {
    router.push(`/pokemon/${pokemon.name}`)
  })
}
</script>

<template>
  <div
    class="w-full bg-teal-600 max-w-xs rounded-xl p-4 cursor-pointer"
    @click="showDetails(pokemon)"
  >
    <h4 class="text-white text-center font-semibold">#{{ pokemon.id }} - {{ pokemon.name }}</h4>
    <div class="flex gap-2 justify-center"
    :style="{ viewTransitionName: pokemon.name }">
      <span v-for="pokemonType in pokemon.types" :key="pokemon.name + pokemonType.type.name">{{
        pokemonType.type.name
      }}</span>
    </div>
    <img
      :src="pokemon.sprites.other?.dream_world.front_default"
      class="w-full aspect-square"
      :alt="`pokemon ${pokemon.name}`"
      
    />
    <p class="text-center">weight: {{ pokemon.weight }}</p>
  </div>
</template>
