import { mount } from "@vue/test-utils"
import LoaderBall from '@/components/shared/LoaderBall.vue';

describe('Test LoaderBall component', () => {

  test('should match spanshot', () => {

    const wrapper = mount(LoaderBall)
    expect(wrapper.html()).toMatchSnapshot();
  })

  test('img should contain animate-spin class ', () => {

    const wrapper = mount(LoaderBall)
    expect(wrapper.find('img').classes()).toContain('animate-spin')

  })
})