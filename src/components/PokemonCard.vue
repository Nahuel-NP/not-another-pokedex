<template>
  <div class="w-full bg-teal-800 max-w-xs rounded-xl p-4 cursor-pointer">
    <h4 class="text-white text-center font-semibold">
      #{{pokemon.id}} - {{ pokemon.name }}
    </h4>
    <div class="flex gap-2 justify-center">
      <span v-for="pokemonType in pokemon.types" :key="pokemon.name + pokemonType.type.name">{{ pokemonType.type.name }}</span>
    </div>
    <img :src="pokemon.sprites.other?.dream_world.front_default" class="w-full aspect-square" :alt="`pokemon ${pokemon.name}`">
    <p class="text-center">weight: {{ pokemon.weight }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from '@/interfaces/pokeapi'

defineProps<{
  pokemon: Pokemon
}>()
</script>
