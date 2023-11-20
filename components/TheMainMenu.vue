<template>
  <v-container class="main-menu">
    <v-row>
      <v-col v-for="i in menuItems" :key="i" style="padding: 0.2rem">
        <NuxtLink :to="i.link">
          <v-card
            class="mx-auto mt-4"
            :class="i.disabled ? '' : 'py-2' "
            :width="i.disabled ? 90 : 105"
            :height="i.disabled ? 115 : 130"
            link
            :disabled="i.disabled"
            rounded
            elevated
          >
            <v-img :src="i.icon" height="50" width="50" class="mx-auto mt-3"></v-img>
            <p
              class="text-center font-weight-bold mt-4"
              :style="[i.disabled ? 'font-size: 0.6rem' : 'font-size: 0.8rem']"
            >
              {{ i.title }}
            </p>
          </v-card></NuxtLink
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import nurseServices from "~/assets/img/icons/nurse.png";
import hiringNurse from "~/assets/img/icons/hiring.png";
import learning from "~/assets/img/icons/learning.png";
import services from "~/assets/img/icons/service3.png";
import rentTools from "~/assets/img/icons/rent.png";
import sellTools from "~/assets/img/icons/sale.png";
export default {
  setup() {
    const menuItems = ref([
      { title: "آموزشگاه ", icon: learning, disabled: false, link: "#" },
      {
        title: "استخدام پرستار",
        icon: hiringNurse,
        disabled: false,
        link: "./employment/personal-info",
      },
      { title: "خدمات پرستاری", icon: nurseServices, disabled: false, link: "./nurse-service" },
      { title: "خدمات پزشکی (بزودی)", icon: services, disabled: true, link: "#" },
      { title: " اجاره تجهیزات پزشکی (بزودی)  ", icon: rentTools, disabled: true, link: "#" },
      { title: "فروش تجهیزات پزشکی (بزودی) ", icon: sellTools, disabled: true, link: "#" },
    ]);
    return {
      nurseServices,
      menuItems,
    };
  },
};
</script>
<style>
.main-menu{
  .v-card{
    overflow: visible;
  }
}
</style>
