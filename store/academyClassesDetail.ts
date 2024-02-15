import { defineStore } from "pinia";
import { ClassesDetail } from "~/types/classDetail";
// Define the Pinia store for academy classes detail
export const useAcademyClassesDetail = defineStore("academyClassesDetail", () => {
  const router = useRouter();
  const classesDetail = ref<object | ClassesDetail>({});
  const classesDetailData = computed(() => {
    return classesDetail.value;
  });
  // Async function to fetch academy classes detail based on route keyword
  const getAcademyClassesDetail = async (routeTitle: string, routeKeyword: string) => {
    const local = localStorage.getItem("classes");
    if (local) {
      const findClass: ClassesDetail = JSON.parse(local).find((item: ClassesDetail) => {
        return item.route === routeTitle;
      });
      // If class is found, update the classesDetail state
      classesDetail.value = findClass;
    } else {
      // Handle the case where the class is not found in local storage
      // Redirect to the academy page for the specified routeKeyword
      router.push(`/academy/${routeKeyword}`);
    }
  };
  // Expose the necessary functions and state to the components
  return { getAcademyClassesDetail, classesDetailData };
});
