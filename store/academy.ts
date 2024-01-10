import { defineStore } from "pinia";
import { ref, computed, Ref } from "vue";

// Assuming you have the `useMyFetch` function defined elsewhere
// You should import it accordingly.

export const useAcademyStore = defineStore("academy", () => {
  const academy = ref<any[]>([]); // Adjust the type accordingly
  const images = ref<any[]>([]); // Adjust the type accordingly

  const academyData = computed(() => {
    return academy.value;
  });

  const getAcademyData = async (loading: Ref<boolean>, error: Ref<boolean>) => {
    try {
      const data = await useMyFetch("/Class", loading, error, "get", { cache: "force-cache" });
      academy.value = data;
    } catch (error) {
      error.value = true;
      console.error("Error fetching data:", error);
    }
    await Promise.all(
      academy.value.map(async (i) => {
        try {
          const imageData = await useMyFetch(`/uploads/${i.ImageName}`, loading, error, "get");
          images.value = imageData;
        } catch (e) {
          console.log(e);
          error.value = true;
        }
        const blob = new Blob([images.value], { type: "image/jpeg" });
        const reader = new FileReader();

        reader.onload = () => {
          i.image = reader.result as string; // Adjust the type accordingly
        };

        reader.readAsDataURL(blob);

        if (i.Id === "b62d9525-061c-4abc-5343-08db7bc9dafa") {
          i.link = "academy/educational-services";
        } else if (i.Id === "d4f1ac2a-53b8-4b50-a913-08db8052b649") {
          i.link = "academy/health-safety";
        } else {
          i.disable = true;
        }
      })
    );
  };

  return { academyData, academy, getAcademyData };
});