import { useAuthentication } from "~/store/auth";
export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuthentication();
  if (!store.accessTokenGet && to.path !== "/" && from.path !== "/") {
    return navigateTo("/");
  }
});
