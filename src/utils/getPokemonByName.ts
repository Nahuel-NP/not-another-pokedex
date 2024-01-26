import pokeApi from "@/api/pokeApi";
import type { Pokemon } from "@/interfaces/pokeapi";

export const getPokemonInfo = async( nameOrId: string ) => {
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ nameOrId }`);
  return data
}