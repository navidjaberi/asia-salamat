import { defineStore } from "pinia";
import { useAuthentication } from "~/store/auth";
export const useGetUserInfo = defineStore("userInfo", () => {
  const authStore = useAuthentication();
  const userToken = computed(() => {
    return authStore.accessTokenGet;
  });
  const user = ref({});
  const userMessages = ref([]);
  const userInfo = computed(() => {
    return user.value;
  });
  const getUserMessages = computed(() => {
    return userMessages.value;
  });
  const getUserInfo = async (loading, error) => {
    try {
      const data = await useMyFetch("/user",loading, error,"getWithToken" );
      user.value = data;
      userMessages.value = data.Messages;
    } catch (error) {
      error.value = true;
      console.error("Error fetching data:", error);
    } 
  };
  return { getUserInfo, userInfo, getUserMessages };
});
