import SearchForm from "@/components/home/SearchForm.vue"
import { DOMWrapper, mount } from "@vue/test-utils"

const mockHandleResetFilter = vitest.fn()
const mockHandleFilter = vitest.fn()
describe('Test SearchForm component', () => {


  beforeEach(() => {
    vitest.clearAllMocks()
  })
  test('should render component correctly with default values', () => {

    const wrapper = mount(SearchForm, {
      props: {
        tempName: '',
        handleFilter: mockHandleFilter,
        handleResetFilter: mockHandleResetFilter,
        isFiltering: false
      }
    })
    expect(wrapper.find('input').text()).toBe('')
    expect(wrapper.find('[aria-label=Reset]').exists()).toBe(false)
  })

  test('should show Reset button and input value ', () => {
    const pokemonName = 'pikachu'
    const wrapper = mount(SearchForm, {
      props: {
        tempName: pokemonName,
        handleFilter: mockHandleFilter,
        handleResetFilter: mockHandleResetFilter,
        isFiltering: true
      }
    })
    // expect(wrapper.get('input').text()).toBe(pokemonName)
    expect((wrapper.find('#simple-search').element as HTMLInputElement).value).toBe('pikachu')
    expect(wrapper.find('[aria-label=Reset]').exists()).toBe(true)

  })

  test('should call submit function', async () => {
    const pokemonName = ''
    const wrapper = mount(SearchForm, {
      props: {
        tempName: pokemonName,
        handleFilter: mockHandleFilter,
        handleResetFilter: mockHandleResetFilter,
        isFiltering: false
      }
    })

    await wrapper.find('form').trigger('submit')
    expect(mockHandleFilter).toHaveBeenCalled()
  })

  test('should call reset function', async () => {
    const pokemonName = 'pikachu'
    const wrapper = mount(SearchForm, {
      props: {
        tempName: pokemonName,
        handleFilter: mockHandleFilter,
        handleResetFilter: mockHandleResetFilter,
        isFiltering: true
      }
    })

    await wrapper.find('form').trigger('reset')
    expect(mockHandleResetFilter).toHaveBeenCalled()

  })

  test('should emit update-input event', async () => {
    const pokemonName = ''
    const wrapper = mount(SearchForm, {
      props: {
        tempName: pokemonName,
        handleFilter: mockHandleFilter,
        handleResetFilter: mockHandleResetFilter,
        isFiltering: false
      }
    })

    const input = wrapper.find('#simple-search') as DOMWrapper<HTMLInputElement>
    input.element.value = 'pikachu';
    await input.trigger('input')

    expect(wrapper.emitted('update-input')).toBeTruthy()

  })



})