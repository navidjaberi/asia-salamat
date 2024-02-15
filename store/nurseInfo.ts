import { defineStore } from "pinia";
import NurseInfo from "~/types/nurseInfo";
// Define the Pinia store for NurseInfo
export const useNurseInfoStore = defineStore("nurseInfo", () => {
  const router = useRouter();
  const info = ref<object | NurseInfo>({});
  // Define a computed property for NurseInfo
  const nurseInfo = computed(() => {
    return info.value as NurseInfo;
  });
  // Define an asynchronous function to post NurseInfo data
  const postNurseInfo = async (loading: Ref<boolean>, error: Ref<boolean>): Promise<void> => {
    try {
      // Assuming useMyFetch returns NurseInfo
      const data = await useMyFetch("/Nurse", loading, error, "post", "", info.value);
      if (data) {
        localStorage.setItem("nurseId", data.Id);
        router.push("/employment/upload-image");
      }
    } catch (err) {
      error.value = true;
      console.error("Error fetching data:", err);
    }
  };
    // Return the properties and functions for external use
  return { nurseInfo, info, postNurseInfo };
});
