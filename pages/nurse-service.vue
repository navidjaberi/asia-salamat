<template>
  <div>
    <VApp>
      <v-app-bar
        color="grey-lighten-5"
        elevation="1"
      >
        <v-app-bar-nav-icon variant="text" style="position: absolute"
          ><NuxtLink to="/home"><v-icon>mdi-arrow-left</v-icon></NuxtLink></v-app-bar-nav-icon
        >
        <v-col> <p class="text-center font-weight-bold">خدمات پرستاری</p></v-col>
      </v-app-bar>
      <v-main>
        <v-col v-for="i in nurseServicesMenu" :key="i">
          <v-card class="mx-auto mt-4" link rounded elevated>
            <v-img :src="i.img" cover class="mx-auto" :alt="i.title">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <p class="text-center font-weight-bold my-3">
              {{ i.title }}
            </p>
          </v-card>
        </v-col>
      </v-main>
    </VApp>
  </div>
</template>
<script>
import nurseChild from "~/assets/img/pics/nurse-child.png";
import nurseElderly from "~/assets/img/pics/elderly-nurse.png";
import nurseSick from "~/assets/img/pics/sick-nurse.jpg";
export default {
  setup() {
    const nurseServicesMenu = ref([
      { title: "پرستار کودک", img: nurseChild, link: "#" },
      { title: "پرستار سالمند", img: nurseElderly, link: "#" },
      { title: "پرستار بیمار", img: nurseSick, link: "#" },
    ]);

    return {
      nurseServicesMenu,
    };
  },
};
</script>
