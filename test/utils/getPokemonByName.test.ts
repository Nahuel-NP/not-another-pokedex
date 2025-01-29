import { getPokemonInfo } from "@/utils/getPokemonByName"

describe('Test getPokemonByName file', () => {

  test('should return pikachu pokemon info', async () => {
    const pokemonName = 'pikachu'
    const pokemon = await getPokemonInfo(pokemonName)
    expect(pokemon.name).toContain(pokemonName)

  })
})