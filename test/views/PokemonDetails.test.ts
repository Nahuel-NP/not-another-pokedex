import router from "@/router"
import HomeView from "@/views/HomeView.vue"
import { useQuery, VueQueryPlugin } from "@tanstack/vue-query"
import { flushPromises, mount } from "@vue/test-utils"
import { createPinia, setActivePinia } from "pinia"
import { createApp, ref } from "vue"


const app = createApp({})




describe('Test Home View', () => {

  window.scrollTo = vitest.fn();
  beforeAll(() => {
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  })
  beforeEach(() => {
    vi.clearAllMocks()
  })
  test('should show loader component  ', () => {


    const wrapper = mount(HomeView, {
      global: {
        plugins: [router, VueQueryPlugin]
      }
    })

    expect(wrapper.html()).toContain('Cargando...')
    expect(wrapper.find('[data-testid="grid-elements"]').exists()).toBe(false)

  })
  test('should render pokemons grid component', async (ctx) => {

    const wrapper = mount(HomeView, {
      global: {
        plugins: [router, VueQueryPlugin]
      }
    })

    await flushPromises();
    // await useQuery finish
    await new Promise(resolve => setTimeout(resolve, 2000));
    wrapper.vm.$nextTick()

    expect(wrapper.html()).not.toContain('Cargando...')
    expect(wrapper.find('[data-testid="grid-elements"]').exists()).toBe(true)

  })
})