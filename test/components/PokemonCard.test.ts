import { mount } from '@vue/test-utils'
import PokemonCard from '@/components/PokemonCard.vue';
import type { Pokemon } from '@/interfaces/pokeapi';
import { getPokemonInfo } from '@/utils/getPokemonByName';
import { createPinia, setActivePinia } from 'pinia';
import { createApp } from 'vue';
import router from '@/router';
import { getPokemonTest } from '@/utils/getPokemonTest';

const testPokemon = getPokemonTest()
const app = createApp({})
describe('Test PokemonCard component', () => {
  beforeAll(() => {
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  })

  beforeEach(() => {
    vitest.clearAllMocks()
  })

  window.scrollTo = vitest.fn();

  test('should show PokemonCard correctly', async () => {


    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: testPokemon 
      }, global: {
        plugins: [router]
      }
    })
    expect(wrapper.find('h4').text()).toContain('ditto')

  })

  test('should call showDetails function',  async () => {

    const mockShowDetails = vitest.fn()
    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: testPokemon
      }, global: {
        plugins: [router]
      },
      data: () => ({
        showDetails: mockShowDetails
      })
    })

    await wrapper.find('div').trigger('click')
    expect(mockShowDetails).toHaveBeenCalled()
    

  })
})