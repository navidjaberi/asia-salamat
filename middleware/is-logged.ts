import { useAuthentication } from "~/store/auth";
export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuthentication();
  if (store.accessTokenGet) {
    if (to.path === "/" || to.path === "/confirm") {
      return navigateTo("/home");
    }
  }
});
