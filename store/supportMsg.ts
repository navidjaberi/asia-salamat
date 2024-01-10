import { defineStore } from "pinia";
export const useSupportMsg = defineStore("supportMsg", () => {
  const allMessages = ref([]);
  const getAllMessages = computed(() => {
    return allMessages.value;
  });
  const extractTime = (i) => {
    const d = new Date(i);
    const newDate = new Date(d.getTime() + 3.5 * 60 * 60 * 1000);
    const hour = newDate.getHours();
    const minutes = String(newDate.getMinutes()).padStart(2, "0");
    const currentHour = `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    return currentHour;
  };
  const getPersianDate = (date) => {
    const d = date.toLocaleDateString("fa-IR");
    const persianDate = useToEnglishDigits(d);
    return persianDate;
  };
  const blobToImg = (file, img) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      img.image = reader.result;
    };
    reader.readAsDataURL(file);
  };
  const getSupportMessages = async (loading, error) => {
    try {
      const data = await useMyFetch("/Message", loading, error, "getWithToken",{ cache: "force-cache" });
      allMessages.value = data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return;
    }
    allMessages.value.forEach(async (i) => {
      i.time = extractTime(i.CreatedAt);
      i.date = getPersianDate(new Date(i.CreatedAt));
      if (i.MessageType === "image") {
        try {
          const imageData = await useMyFetch(`/uploads/${i.Content}`, loading, error, "get");
          blobToImg(imageData, i);
        } catch (e) {
          console.log(e);
          error.value = true;
        }
      }
    });

  };
  return {
    getSupportMessages,
    getAllMessages,
  };
});
