<template>
  <v-container >
    <v-row
      ><v-col class="mt-7 mb-5 mx-auto" lg="7" xl="7">
        <v-img :src="banner" cover aspect-ratio="16/9" class="rounded-xl"> </v-img> </v-col
    ></v-row>
    <v-snackbar
      :timeout="2000"
      color="teal-accent-4"
      rounded="pill"
      location="top"
      v-model="openAlert"
    >
      <template v-slot:activator="{ props }"> </template>
      <p class="text text-center">خدمات مورد نظر به زودی اضافه خواهد شد</p>
    </v-snackbar>
    <div class="mt-5">
      <v-container class="main-menu">
        <v-row class="justify-center">
          <v-col
            v-for="i in menuItems"
            :key="i"
            :class="['flex-grow-0 flex-shrink-0', mobile ? 'pa-1' : 'pa-2']"
            cols="4"
          >
            <NuxtLink :to="!i.disable ? i.link : ''" @click="disableAlert(i)">
              <v-card
                :class="i.disable ? 'py-4' : 'py-5'"
                link
                :height="150"
                :disable="i.disable"
                rounded
                elevated
              >
                <v-img :src="i.icon" height="50" width="50" class="mx-auto mt-3"></v-img>
                <p
                  class="text-center font-weight-bold mt-4"
                  :style="[i.disable ? 'font-size: 0.6rem' : 'font-size: 0.8rem']"
                >
                  {{ i.title }}
                </p>
              </v-card></NuxtLink
            >
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>
<script>
import banner from "~/assets/img/pics/banner.jpg";
import nurseServices from "~/assets/img/icons/nurse.png";
import hiringNurse from "~/assets/img/icons/hiring.png";
import learning from "~/assets/img/icons/learning.png";
import services from "~/assets/img/icons/service3.png";
import rentTools from "~/assets/img/icons/rent.png";
import sellTools from "~/assets/img/icons/sale.png";
import { useDisplay } from "vuetify";
import { useGetUserInfo } from "~/store/userInfo";
export default {
  setup() {
    definePageMeta({
      layout: "main",
    });
    const { mobile } = useDisplay();
    const store = useGetUserInfo();
    const loading = ref(false);
    const error = ref(false);
    const openAlert = ref(false);
    const disableAlert = (i) => {
      if (i.disable) {
        openAlert.value = true;
      }
    };
    const menuItems = ref([
      { title: "آموزشگاه ", icon: learning, disable: false, link: "/academy" },
      {
        title: "استخدام پرستار",
        icon: hiringNurse,
        disable: false,
        link: "/employment/personal-info",
      },
      { title: "خدمات پرستاری", icon: nurseServices, disable: false, link: "/nurse-services" },
      { title: "خدمات پزشکی (بزودی)", icon: services, disable: true, link: "#" },
      { title: " اجاره تجهیزات پزشکی (بزودی)  ", icon: rentTools, disable: true, link: "#" },
      { title: "فروش تجهیزات پزشکی (بزودی) ", icon: sellTools, disable: true, link: "#" },
    ]);
;
    return { banner, menuItems, disableAlert, openAlert, mobile, loading, error };
  },
};
</script>
<style>
.main-menu {
  .v-card {
    overflow: visible;
  }
}
</style>
