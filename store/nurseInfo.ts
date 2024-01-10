import { defineStore } from "pinia";
export const useNurseInfoStore = defineStore("nurseInfo", () => {
  const info = ref({});
  const nurseInfo = computed(() => {
    return info.value;
  });
  const postNurseInfo = async (loading, error) => {
    console.log(info.value);
    try {
      const data = await useMyFetch("/Nurse", loading, error, "post", "", info.value);
      console.log(data);
    } catch (error) {
      error.value = true;
      console.error("Error fetching data:", error);
    }
  };
  return { nurseInfo, info, postNurseInfo };
});
