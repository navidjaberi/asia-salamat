import { defineStore } from "pinia";
export const useAcademyClasses = defineStore("academyClasses", () => {
  const classes=ref([])
  const classesData = computed(() => {
    return classes.value;
  });

  const getAcademyClasses = async (id, loading, error) => {
    try {
      const data = await useMyFetch(`/Class/get-single?title=${id}`, loading, error, "get",{cache:"force-cache"} );
      classes.value= data;
      localStorage.setItem('classes',JSON.stringify(data))
    } catch (error) {
      error.value = true;
      console.error("Error fetching data:", error);
    } 
  };
  return { getAcademyClasses, classesData,classes};
});
