<template>
  <div>
    <VApp>
      <v-card class="app-bar">
          <v-app-bar color="white" elevation="1">
            <v-row class="px-2">
              <v-col cols="3" class="d-flex align-center">
                <img :src="logo" :width="150" class="mr-3" alt="Asiasalamat logo" />
              </v-col>
              <v-col cols="6" class="d-flex align-center">
                <MainNavigationNav v-if="xlAndUp" />
              </v-col>
              <v-col cols="3" class="d-flex align-center justify-end">
              
                  <v-btn variant="text" size="x-large"      density="compact" @click="openMsg" class="mr-n2" icon="mdi-email-outline">
                   
                  </v-btn>

                <v-dialog v-model="dialog" persistent width="auto">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="text"
                      icon="mdi-exit-to-app"
                      size="x-large"
                      density="compact"
                      class="mx-1"
                      v-bind="props"
                    >
                  
                    </v-btn>
                  </template>
                  <v-row justify="center">
                    <v-card>
                      <v-card-text class="text-title">
                        آيا مایل به خروج از آسیاسلامت هستید؟
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="teal-accent-4" variant="text" @click="dialog = false">
                          خیر
                        </v-btn>
                        <v-btn color="teal-accent-4" variant="text" @click="logoutHandler">
                          بله
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-row>
                </v-dialog>
              </v-col>
            </v-row>
          </v-app-bar>
          <v-main class="main">
            <slot />
            <MainNavigationNav v-if="!xlAndUp" :mobile="!xlAndUp" />
          </v-main>
      
      </v-card>
    </VApp>
  </div>
</template>
<script>
import logo from "~/assets/img/icons/main-logo.png";
import { useDisplay } from "vuetify";
import { useAuthentication } from "~/store/auth";
export default {
  setup() {
    const store = useAuthentication();
    const tokenCookie = useCookie("userToken");
    const idCookie = useCookie("userId");
    const router = useRouter();
    const drawer = ref(false);
    const dialog = ref(false);
    const { xlAndUp } = useDisplay();
    const logoutHandler = () => {
      tokenCookie.value = null;
      idCookie.value = null;
      store.accessToken = null;
      store.userId = null;
      localStorage.clear();
      router.push("/");
    };
    const openMsg=()=>{
      router.push('/messages')
    }
    return {
      drawer,
      dialog,
      logo,
      openMsg,
      xlAndUp,
      logoutHandler,
    };
  },
};
</script>
<style>
.app-bar {
  .v-toolbar__content {
    height: 65px !important;
  }
  .v-badge--dot .v-badge__badge {
    width: 11px !important;
    height: 11px !important;
    bottom: calc(100% - 13px) !important;
    left: calc(100% - -21px) !important;
    z-index: 1;
  }
  .main {
    height: 94vh;
    display: flex;
    flex-direction: column;
  }
}
</style>
