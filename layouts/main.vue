<template>
  <div>
    <VApp>
      <v-card>
        <v-layout>
          <v-app-bar color="white" elevation="1">
            <img :src="logo" :width="170" class="mr-3" alt="Asiasalamat logo" />
            <v-spacer></v-spacer>
            <div>
              <NuxtLink to="/messages"
                ><v-btn variant="text" class="ml-2" icon="mdi-email-outline" size="xl"></v-btn
              ></NuxtLink>
              <v-app-bar-nav-icon
                variant="text"
                @click.stop="drawer = !drawer"
              ></v-app-bar-nav-icon>
            </div>
          </v-app-bar>

          <v-navigation-drawer v-model="drawer" location="right" :width="230" temporary>
            <v-list>
              <v-container class="avatar">
                <div>
                  <v-avatar color="info" size="x-large">
                    <v-icon icon="mdi-account-circle"></v-icon>
                  </v-avatar>
                  <div><p class="mt-3 text-white">Navid Jaberi</p></div>
                </div>
              </v-container>
            </v-list>
            <v-list class="text-right text-grey-darken-2 font-weight-bold" style="font-size: 12px">
              <v-list-item>
                تماس با ما

                <v-icon icon="mdi-account-box" class="ml-3"></v-icon>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                خروج
                <v-icon icon="mdi-exit-to-app" class="ml-3"></v-icon>
              </v-list-item>
            </v-list>
            <template v-slot:append>
              <div>
                <p class="text-center text-grey-darken-1 mb-3">توسعه و طراحی توسط رایانیارش کارا</p>
              </div>
            </template>
          </v-navigation-drawer>

          <v-main style="min-height: 100vh !important; display: flex; flex-direction: column">
            <slot />
            <TheNavigation />
          </v-main>
        </v-layout>
      </v-card>
    </VApp>
  </div>
</template>
<script>
import TheNavigation from "~/components/navigation/TheNavigation.vue";
import logo from "~/assets/img/icons/main-logo.png";
export default {
  components: { TheNavigation },
  setup() {
    const drawer = ref(false);
    return {
      drawer,
      logo,
    };
  },
};
</script>
<style scoped>
.avatar {
  height: 170px;
  width: 350px;
  background-color: aqua;
  border-radius: 49%;
  margin-left: -55px;
  margin-right: -9px;
  margin-top: -41px;
  background: rgb(1, 52, 57);
  background: linear-gradient(
    90deg,
    rgba(1, 52, 57, 1) 0%,
    rgba(9, 98, 96, 1) 51%,
    rgba(7, 181, 205, 1) 100%
  );
}
.avatar div {
  text-align: center;
  margin-top: 15px;
}
</style>
