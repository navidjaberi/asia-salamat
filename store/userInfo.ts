
import { useAuthentication } from "~/store/auth";
// Define a Pinia store for user information
export const useGetUserInfo = defineStore("userInfo", () => {
  // Use the authentication store to get the access token
  const authStore = useAuthentication();

  const userToken = computed(() => {
    return authStore.accessTokenGet;
  });

  // Define reactive variables for user and user messages
  const user = ref<object>({});
  const userMessages = ref([]);

  // Define computed properties for user information and messages
  const userInfo = computed(() => {
    return user.value;
  });

  const getUserMessages = computed(() => {
    return userMessages.value;
  });

  // Define an asynchronous function to fetch user information
  const getUserInfo = async (loading: Ref<boolean>, error: Ref<boolean>) => {
    try {
      // Use the custom fetch function to make an authenticated request
      const data = await useMyFetch("/user", loading, error, "getWithToken");
      
      // Update user and user messages with the fetched data
      user.value = data;
      userMessages.value = data.Messages;
    } catch (err) {
      // Set error flag and log the error if the request fails
      error.value = true;
      console.error("Error fetching data:", err);
    }
  };

  // Return the properties and functions for external use
  return { getUserInfo, userInfo, getUserMessages };
});


