<script lang="ts" setup>
import { computed, ref, type Ref, watch } from 'vue'
import { getPokemonInfo } from '../utils/getPokemonByName'
import PokemonCard from '@/components/PokemonCard.vue'
import LoaderBall from '@/components/shared/LoaderBall.vue'
import SearchForm from '@/components/home/SearchForm.vue'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'
import { getPokemons } from '../utils/getAllPokemons'
import { usePokemonStore } from '../stores/pokemonStore';
import { useRoute, useRouter } from 'vue-router';
import Pagination from '@/components/home/Pagination.vue'

const store = usePokemonStore()
const router = useRouter()
const route = useRoute()


const page = computed({
  get() {
    if (route.query.page && Number(route.query.page) > 0) {
      return Number(route.query.page)
    }
    return 1
  },
  set(page) {
    router.replace({ query: { page } })
  }
})


const searchByName = async (nameToSearch: Ref<string>) => {
  const data = await getPokemonInfo(nameToSearch.value.toLowerCase())
  return data
}


const {
  data: allPokemons,
  isFetching,
  isPlaceholderData
} = useQuery({
  queryKey: ['pokemons', page],
  queryFn: () => getPokemons(page),
  staleTime: 60 * 1000 * 10, //10 minutos
  placeholderData: keepPreviousData
})

const nameToSearch = ref('')
const isFiltering = ref(false)
const tempName = ref('')

const {
  data: pokemonByName,
  isError,
  isFetching: isFetchigPokemon
} = useQuery({
  queryFn: () => searchByName(nameToSearch),
  queryKey: ['pokemon', nameToSearch],
  enabled: isFiltering,
  staleTime: 60 * 1000 * 10,
  retry: false
})

const prevPage = () => {
  const newPage = Math.max(page.value - 1, 1)
  page.value = newPage
  store.setActivePage(newPage)
  router.push({
    name: 'home',
    query: {
      page: newPage
    }
  })

}

const nextPage = () => {
  if (!isPlaceholderData.value) {
    const newPage = page.value + 1
    page.value = newPage;
    store.setActivePage(newPage)
    router.push({
      name: 'home',
      query: {
        page: newPage
      }
    })
  }
}

const handleFilter = (event: SubmitEvent) => {
  event.preventDefault()
  if (tempName.value !== '') {
    isFiltering.value = true
    nameToSearch.value = tempName.value
  }
}

const handlerResetFilter = () => {
  isFiltering.value = false
  nameToSearch.value = ''
}

const onUpdateInput = (value: string) => {
  tempName.value = value
}
</script>

<template>
  <main class="min-h-svh py-8">
    <div
      class="fixed top-0 z-[-2] h-svh w-screen bg-[#000000] bg-[radial-gradient(teal,#00091d_1px)] bg-[size:20px_20px]">
    </div>

    <SearchForm :handle-filter="handleFilter" :handle-reset-filter="handlerResetFilter" :is-filtering="isFiltering"
      :temp-name="tempName" @update-input="onUpdateInput" />

    <div v-if="pokemonByName" class="w-full">
      <PokemonCard :pokemon="pokemonByName" class="mx-auto max-w-52" />
    </div>

    <div data-testid="grid-elements" v-if="!isFetching && !isFiltering"
      class="grid mx-auto px-4 container grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 w-full place-items-center">
      <PokemonCard v-for="pokemon in allPokemons?.results" :key="pokemon!.id" :pokemon="pokemon!" />
    </div>

    <LoaderBall v-if="isFetching || isFetchigPokemon" />

    <div v-if="isError">
      <h2 class="text-white text-center text-2xl font-semibold">Pokemon no encontrado</h2>
    </div>

    <Pagination @next-page="nextPage" :is-filtering="isFiltering" :page="page" @prev-page="prevPage" />
  </main>
</template>
