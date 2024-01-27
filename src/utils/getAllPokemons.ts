import pokeApi from "@/api/pokeApi"
import type { PokeResponse } from "@/interfaces/pokeapi"
import type { Ref } from "vue"
import { getPokemonInfo } from "./getPokemonByName"

export const getPokemons = async (page: Ref<number>, limit: number = 24) => {
  const { data } = await pokeApi.get<PokeResponse>('/pokemon', {
    params: {
      limit,
      offset: (page.value - 1) * limit
    }
  })
  console.log({ data })
  const promises = data.results.map(async (pokemon) => {
    const pokemonResponse = await getPokemonInfo(pokemon.name)
    return pokemonResponse
  })

  const [...results] = await Promise.all(promises)

  const totalPages = Math.ceil(data.count / limit)

  return {
    ...data,
    totalPages,
    results
  }
}