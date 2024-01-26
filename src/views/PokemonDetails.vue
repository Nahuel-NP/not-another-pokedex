<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '../stores/pokemonStore'
import { getPokemonInfo } from '../utils/getPokemon'
import LoaderBall from '@/components/shared/LoaderBall.vue'
import { useTransition } from '../utils/useTransition';

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
  <main class="min-h-screen flex flex-col justify-center items-center">
    <button @click="handleTransition('/')" class="text-white">Back</button>
    <div
      class="fixed top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(teal,#00091d_1px)] bg-[size:20px_20px]"
    ></div>
    <div
      v-if="store.getActivePokemon"
      class="w-full flex max-w-md p-12"
      :style="{ viewTransitionName: store.getActivePokemon.name }"
    >
      <img
        class="w-full"
        :src="store.getActivePokemon.sprites.other?.dream_world.front_default"
        :alt="store.getActivePokemon.name"
      />
    </div>
    <LoaderBall v-if="isLoading" />
  </main>
</template>
