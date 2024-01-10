import { defineStore } from "pinia"
export const useAcademyClassesDetail = defineStore("academyClassesDetail", () => {
    const classesDetail=ref({})
    const classesDetailData=computed(()=>{
        return classesDetail.value
    })
    const router=useRouter()
const getAcademyClassesDetail = async (routeKeyword) => {
    const local = localStorage.getItem('classes');
    if (local) {
    const findClass = JSON.parse(local).find((item)=>{
        return item.route===routeKeyword
      })
        classesDetail.value =findClass
    } else {
      router.push(`/academy/${routeKeyword }`);
    }
  }
  return{getAcademyClassesDetail,classesDetailData}
})