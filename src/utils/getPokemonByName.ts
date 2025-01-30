import pokeApi from "@/api/pokeApi";
import type { Pokemon } from "@/interfaces/pokeapi";

export const getPokemonInfo = async (nameOrId: string) => {

  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
    return data
  } catch (error) {
    throw new Error("Pokemon not found");
  }
}