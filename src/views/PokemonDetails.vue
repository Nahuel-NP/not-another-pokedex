<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'
import { getPokemonInfo } from '../utils/getPokemonByName'
import LoaderBall from '@/components/shared/LoaderBall.vue'
import { useTransition } from '../utils/useTransition'

const store = usePokemonStore()
const route = useRoute()
const isLoading = ref(false)

const getPokemon = async (name: string) => {
  isLoading.value = true
  const pokemon = await getPokemonInfo(name)

  if (pokemon) {
    store.setActivePokemon(pokemon)
  }
  isLoading.value = false
}

if (!store.getActivePokemon) {
  const { name } = route.params
  getPokemon(name as string)
}

const { handleTransition } = useTransition()
</script>

<template>
  <main class="min-h-screen flex flex-col pt-12 relative justify-center items-center">
    <div
      class="fixed top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(teal,#00091d_1px)] bg-[size:20px_20px]"
    ></div>
    <h2 class="text-teal-500 text-4xl font-bold capitalize">{{ store.getActivePokemon?.name }}</h2>
    <div
      v-if="store.getActivePokemon"
      class="w-full grid gap-8 items-center lg:grid-cols-2 max-w-5xl p-4 md:p-10"
    >
      <img
        class="w-full max-w-sm mx-auto aspect-square"
        :style="{ viewTransitionName: store.getActivePokemon.name }"
        :src="
          store.getActivePokemon.sprites.other?.dream_world.front_default !== null
            ? store.getActivePokemon.sprites.other?.dream_world.front_default
            : store.getActivePokemon.sprites.other?.['official-artwork'].front_default
        "
        :alt="store.getActivePokemon.name"
      />
      <div class="bg-gray-200 border-gray-700 border-4 p-4 rounded-md text-lg">
        <p class="flex gap-2">
          Tipo:
          <span v-for="PokemonType in store.getActivePokemon.types" :key="PokemonType.type.name">
            {{ PokemonType.type.name }}
          </span>
        </p>
        <p>Peso: {{ store.getActivePokemon.weight }}</p>
        <div>
          <p class="flex gap-x-1 flex-row flex-wrap">
            Movimientos:
            <span
              class="last:after:!content-['.'] odd:after:content-[','] even:after:content-[',']"
              v-for="Move in store.getActivePokemon.moves"
              :key="Move.move.name"
            >
              {{ Move.move.name }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <LoaderBall v-if="isLoading" />
    <button @click="handleTransition('/')" class="absolute top-0 text-white">Volver</button>
  </main>
</template>
../utils/getPokemonByName
