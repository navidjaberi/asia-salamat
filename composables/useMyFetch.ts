import { useAuthentication } from "~/store/auth";
/**
 * Custom fetch function with authentication handling.
 *
 * @param endpoint - API endpoint.
 * @param loading - Ref for loading state.
 * @param error - Ref for error state.
 * @param method - HTTP request method.
 * @param option - Additional options for the request.
 * @param postBody - Request body for POST and PUT methods.
 * @returns A Promise that resolves to the fetched data or throws an error.
 */
export const useMyFetch: (
  endpoint: string,
  loading: Ref<boolean>,
  error: Ref<boolean>,
  method: "get" | "getWithToken" | "post" | "put",
  option?: {},
  postBody?: any
) => Promise<any> = async (endpoint, loading, error, method, option, postBody) => {
  loading.value = true;
  const store = useAuthentication();
  const userToken = computed(() => {
    return store.accessTokenGet as string;
  });
  try {
    const config = useRuntimeConfig();
    let response:any;
    //fetch data with simple get method without header opt...
    if (method === "get") {
      response = await useFetch(config.public.baseURL + endpoint, { ...option });
      //fetch data with get method and send the Token for authentication
    } else if (method === "getWithToken") {
      response = await useFetch(config.public.baseURL + endpoint, {
        headers: {
          Authorization: `Bearer ${userToken.value}`,
        },
        ...option,
      });
      //post data with post or put method with the Token for authentication and the request body as an option
    } else if (method === "post" || method === "put") {
      const requestMethod: "POST" | "PUT" = method.toUpperCase() as "POST";
      response = await useFetch(config.public.baseURL + endpoint, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${userToken.value}`,
          ...option,
        },
        body: postBody,
      });
    }
    //handling the success res
    if (response.status.value === "success") {
      loading.value = false;
      const data = await response.data.value;
      return data;
      //handling the error res
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
