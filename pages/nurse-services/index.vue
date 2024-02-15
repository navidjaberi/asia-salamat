<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="خدمات پرستاری"
        :subPagesMode="true"
        @baseRouteBackHandler="routBackHandler"
      >
        <v-row no-gutters>
          <v-col v-for="i in nurseServicesMenu" :key="i" cols="12" lg="4" xxl="3" xl="4" md="4" class="pa-3">
            <NuxtLink :to="i.link">
              <v-card class="mx-auto mt-4" link rounded elevated>
                <v-img :src="i.img" cover class="mx-auto" :alt="i.title">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular
                        indeterminate
                        color="grey-lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <p class="text-center  text-title my-3">
                  {{ i.title }}
                </p>
              </v-card>
            </NuxtLink>
          </v-col>
        </v-row>
      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import nurseChild from "~/assets/img/pics/nurse-child.png";
import nurseElderly from "~/assets/img/pics/elderly-nurse.png";
import nurseSick from "~/assets/img/pics/sick-nurse.jpg";
export default {
  setup() {
    const router = useRouter();
    const nurseServicesMenu = ref([
      { title: "پرستار کودک", img: nurseChild, link: "nurse-services/child-nursing" },
      { title: "پرستار سالمند", img: nurseElderly, link: "nurse-services/elder-nursing" },
      { title: "پرستار بیمار", img: nurseSick, link: "nurse-services/sick-nursing" },
    ]);
    const routBackHandler = () => {
      router.push("/home");
    };
    return {
      nurseServicesMenu,
      routBackHandler,
    };
  },
};
</script>
