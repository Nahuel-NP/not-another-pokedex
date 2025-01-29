<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'
import { getPokemonInfo } from '../utils/getPokemonByName'
import LoaderBall from '@/components/shared/LoaderBall.vue'
import { useTransition } from '../utils/useTransition'
import BackIcon from '@/components/icons/BackIcon.vue'

const store = usePokemonStore()
const route = useRoute()
const isLoading = ref(false)
const hasError = ref(false)

const getPokemon = async (name: string) => {
  isLoading.value = true
  try {
    const pokemon = await getPokemonInfo(name)
    if (pokemon) {
      store.setActivePokemon(pokemon)
    }
  } catch (error) {
    hasError.value = true
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
    <nav class="flex w-full text-xl max-w-5xl mx-auto px-10">
      <button
        @click="handleTransition(`/?page=${store.activePage}`)"
        class="text-white transition-transform hover:scale-105 font-bold flex flex-row"
      >
        <BackIcon class="stroke-teal-500 fill-teal-500" />
        Volver
      </button>
    </nav>

    <h2 class="text-teal-400 italic text-4xl font-bold capitalize">
      {{ store.getActivePokemon?.name }}
    </h2>

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

      <div class="bg-gray-800 bg-opacity-55 border-4 p-8 rounded-md border-teal-950">
        <p class="text-gray-100">
          <span class="capitalize font-semibold text-xl text-teal-200">
            {{ store.getActivePokemon.name }}
          </span>
          es el pokemon numero {{ store.getActivePokemon.id }} en la pokedex, es del tipo
          <span
            class="ml-1 last:after:!content-['.'] odd:after:content-[','] even:after:content-[',']"
            v-for="PokemonType in store.getActivePokemon.types"
            :key="PokemonType.type.name"
          >
            {{ PokemonType.type.name }}
          </span>
        </p>
        <p class="text-white">
          Posee una altura de {{ store.getActivePokemon.height }} pies y un peso de
          {{ store.getActivePokemon.weight }} libras.
        </p>
        <p class="text-white mt-2">
          <span class="font-semibold"> Habilidades: </span>
          <span
            class="ml-1 last:after:!content-['.'] odd:after:content-[','] even:after:content-[',']"
            v-for="PokemonAbility in store.getActivePokemon.abilities"
            :key="PokemonAbility.ability.name"
          >
            {{ PokemonAbility.ability.name }}
          </span>
        </p>
      </div>

      <div class="bg-gray-300 md:col-span-2 border-gray-700 border-4 p-4 rounded-md text-lg">
        <div>
          <p class="flex gap-x-1 text-base flex-row flex-wrap">
            <span class="font-semibold"> Movimientos: </span>
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
    <div class="flex justify-center" v-if="hasError">
      <p class="text-white text-center text-2xl font-semibold">Pokemon no encontrado</p>
    </div>
    <LoaderBall v-if="isLoading" />
  </main>
</template>
