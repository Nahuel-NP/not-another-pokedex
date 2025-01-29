import { getPokemonInfo } from "@/utils/getPokemonByName"

describe('Test getPokemonByName file', () => {

  test('should return pikachu pokemon info', async () => {
    const pokemonName = 'pikachu'
    const pokemon = await getPokemonInfo(pokemonName)
    expect(pokemon).toBeTruthy()
    expect(pokemon!.name).toContain(pokemonName)

  })

  test('should return null if pokemon not exist',async ()=>{
    const pokemonName = 'pikachus'
    const pokemon = await getPokemonInfo(pokemonName)
    expect(pokemon).toBe(null)
  })
})