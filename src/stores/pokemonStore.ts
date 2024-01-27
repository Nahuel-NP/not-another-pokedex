import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Pokemon } from '@/interfaces/pokeapi'

export const usePokemonStore = defineStore('pokemon', () => {
  const activePokemon = ref<Pokemon | null>()
  const getActivePokemon = computed(() => activePokemon.value)
  function setActivePokemon(pokemon:Pokemon) {
    activePokemon.value = pokemon
  }
  const activePage = ref<number>(1)
  const getActivePage = computed(() => activePage.value)
  function setActivePage(page:number) {
    activePage.value = page
  }
  return { activePokemon, getActivePokemon, setActivePokemon,activePage, getActivePage,setActivePage }
})
