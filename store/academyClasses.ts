import { defineStore } from "pinia";
import { ClassesDetail } from "~/types/classDetail";
// Define the Pinia store for academy classes
export const useAcademyClasses = defineStore("academyClasses", () => {
  const classes = ref<ClassesDetail[]>([]);
  const classesData = computed(() => {
    return classes.value;
  });
  //make a request for fetch each category classes
  const getAcademyClasses = async (id: string, loading: Ref<boolean>, error: Ref<boolean>) => {
    try {
      const data = await useMyFetch(`/Class/get-single?title=${id}`, loading, error, "get", {
        cache: "force-cache",
      
      });
      classes.value = data;
      //store items in local storage for next steps usage
      localStorage.setItem("classes", JSON.stringify(data));
    } catch (err) {
      error.value = true;
      console.error("Error fetching data:", err);
    }
  };
  // Expose the necessary functions and state to the components
  return { getAcademyClasses, classesData, classes };
});
