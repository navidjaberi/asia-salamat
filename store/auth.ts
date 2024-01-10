import { defineStore } from "pinia";
export const useAuthentication = defineStore("auth", () => {
  const cookie = useCookie("userToken");
  const PhoneNumber = ref("");
  const accessToken = ref(null);
  const PhoneNumberGet = computed(() => {
    return PhoneNumber.value;
  });
  const accessTokenGet = computed(() => {
    if (cookie.value) {
      accessToken.value = cookie.value;
    }
    return accessToken.value;
  });
  return { PhoneNumber, PhoneNumberGet, accessToken, accessTokenGet };
});
