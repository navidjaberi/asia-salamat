import { defineStore } from "pinia";
import {Academy} from "~/types/academy"
// Define the Pinia store for academy
export const useAcademyStore = defineStore("academy", () => {
  const academy = ref<Academy[] | []>([]);
  const images = ref<BlobPart>();
  const academyData = computed(() => {
    return academy.value;
  });
  //fetch the academy data from server
  const getAcademyData = async (loading: Ref<boolean>, error: Ref<boolean>) => {
    try {
      const data = await useMyFetch("/Class", loading, error, "get", { cache: "force-cache" });
      academy.value = data;
    } catch (err) {
      error.value = true;
      console.error("Error fetching data:", err);
    }
  //make a request to another Api for getting each academy category's image
    await Promise.all(
      academy.value.map(async (i) => {
        try {
          const imageData = await useMyFetch(`/uploads/${i.ImageName}`, loading, error, "get");
          images.value = imageData;
        } catch (e) {
          console.log(e);
          error.value = true;
        }
        //convert received image to blob for showing it
        const blob = new Blob([images.value as BlobPart], { type: "image/jpeg" });
        const reader = new FileReader();
        reader.onload = () => {
          i.image = reader.result as string;
        };
        reader.readAsDataURL(blob);
        //make a link and a route for each class category
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
