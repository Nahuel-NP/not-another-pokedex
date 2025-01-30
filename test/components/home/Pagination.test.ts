import Pagination from "@/components/home/Pagination.vue"
import { mount } from "@vue/test-utils"

describe('Test Pagination component', () => {


  test('should show componet correctly', () => {

    const wrapper = mount(Pagination, {
      props: {
        isFiltering: false,
        page: 1
      }
    })
    expect(wrapper.find('[aria-label="current-page"]').text()).toBe("1")
  })

  test('should not exist if isFiltering is tru', () => {

    const wrapper = mount(Pagination, {
      props: {
        isFiltering: true,
        page: 1
      }
    })

    expect(wrapper.find('nav').exists()).toBe(false)
  })

  test('should emit prevPage and nextPage events', () => {
    const wrapper = mount(Pagination, {
      props: {
        isFiltering: false,
        page: 1
      }
    })
    const [prevBtn,pageBtn,nextBtn] = wrapper.findAll('button')
    prevBtn.trigger('click')
    nextBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('prevPage')
    expect(wrapper.emitted()).toHaveProperty('nextPage')
    

  })
})