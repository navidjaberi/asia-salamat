export const useMyFetch: typeof useFetch = async (
  endpoint: string,
  loading?: Ref<boolean>,
  error?: Ref<boolean>,
  method: string,
  option: any,
  postBody: any
) => {
  loading.value = true;
  try {
    const config = useRuntimeConfig();
    let response;
    if (method === "get") {
      response = await useFetch(config.public.baseURL + endpoint, { ...option });
    } else if (method === "getWithToken") {
      response = await useFetch(config.public.baseURL + endpoint, {
        headers: {
          Authorization: "Bearer dd9ef129-a440-4f20-9c5a-2e75ca52cf1f",
        },
        ...option,
      });
    } else if (method === "post") {
      response = await useFetch(config.public.baseURL + endpoint, {
        method: "POST",
        headers: {
          Authorization: "Bearer dd9ef129-a440-4f20-9c5a-2e75ca52cf1f",
          ...option,
        },
        body: postBody,
      });
    }
    if (response.status.value === "success") {
      loading.value = false;
      const data = await response.data.value;
      return data;
    } else if (response.error.value) {
      console.log(response.error);
      error.value = true;
      loading.value = false;
      if (response.error.value.data) {
        error.value = true;
        loading.value = false;
      } else {
        error.value = true;
        loading.value = false;
      }
    }
  } catch (error) {
    console.error("Error in useMyFetch:", error);
  }
};
