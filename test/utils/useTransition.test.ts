import { useTransition } from "@/utils/useTransition"
import { useRouter } from "vue-router"


vitest.mock('vue-router')


describe('Test useTransition', () => {

  beforeEach(() => {
    vitest.clearAllMocks()
  })
  test('should return a function  ', () => {

    const { handleTransition } = useTransition()
    expect(typeof handleTransition).toBe('function')

  })

  test('should call router.push with argument', () => {

    vitest.mocked(useRouter).mockReturnValue({
      push: vitest.fn()
    } as any)

    const router = useRouter()
    const { handleTransition } = useTransition()

    handleTransition('/test')

    expect(router.push).toHaveBeenCalledWith('/test')


  })
})