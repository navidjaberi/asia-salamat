import { defineStore } from "pinia";
import Message from "~/types/message";
// Define a Pinia store for support messages
export const useSupportMsg = defineStore("supportMsg", () => {
  // Reactive variable for storing all support messages
  const allMessages = ref<Message[]>([]);
  // Computed property to get all support messages
  const getAllMessages = computed(() => {
    return allMessages.value;
  });
  // Function to extract time from a string representing a date
  const extractTime = (i: string): string => {
    const d = new Date(i);
    const newDate = new Date(d.getTime() + 3.5 * 60 * 60 * 1000);
    const hour = newDate.getHours();
    const minutes = String(newDate.getMinutes()).padStart(2, "0");
    const currentHour = `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    return currentHour;
  };
  // Function to convert a JavaScript date to a Persian date string
  const getPersianDate = (date: Date): string => {
    const d = date.toLocaleDateString("fa-IR");
    const persianDate = useToEnglishDigits(d);
    return persianDate;
  };
  // Function to convert a Blob to an image and assign it to a Message
  const blobToImg = (file: Blob, img: Message): void => {
    const reader = new FileReader();
    reader.onload = () => {
      img.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  };
  // Function to fetch support messages with additional processing
  const getSupportMessages = async (loading: Ref<boolean>, error: Ref<boolean>): Promise<void> => {
    try {
      // Fetch support messages from the server
      const data = await useMyFetch("/Message", loading, error, "getWithToken");
      allMessages.value = data;
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
    } catch (error) {
      console.error("Error fetching data:", error);
      return;
    }
  };
  // Return the properties and functions for external use
  return {
    allMessages,
    getSupportMessages,
    getAllMessages,
  };
});
