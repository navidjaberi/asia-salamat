import { defineStore } from "pinia";
export const useAcademyStore = defineStore("alerts", () => {
  const academy = ref([]);
  const academyData = computed(() => {
    return academy.value;
  });
  const getAcademyData = async (loading) => {
    loading.value = true;
    try {
      const response = await useMyFetch("/Class",{cache:'force-cache'});
      if (response.status.value === "success") {
        loading.value = false;
        const data = await response.data.value;
        data.forEach(async (i) => {
          const response = await useMyFetch(`/uploads/${i.ImageName}`);
          const images = await response.data.value;
          const blob = new Blob([images], { type: "image/jpeg" });
          const reader = new FileReader();
          reader.onload = () => {
            i.image = reader.result;
          };
          reader.readAsDataURL(blob);
          if ((i.id = "b62d9525-061c-4abc-5343-08db7bc9dafa")) {
            i.link = "academy/educational-services";
          }
        });
        console.log(data);
        academy.value = data;
        localStorage.setItem('academy',JSON.stringify(data))
      } else {
        console.log("ok");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { academyData,academy,getAcademyData};
});
