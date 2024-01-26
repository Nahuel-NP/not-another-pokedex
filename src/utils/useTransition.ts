import { useRouter } from "vue-router"

export const useTransition = ()=>{

  const router = useRouter()

  const handleTransition = (route:string) => {

    // @ts-ignore
    if (!document.startViewTransition) {
      router.push(route)
      return
    }
    // @ts-ignore
    document.startViewTransition(() => {
      router.push(route)
    })
  }

  return {
    handleTransition
  }

}