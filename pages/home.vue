<template>
  <v-container>
    <div>
      <TheUserRequests />
    </div>
    <v-divider :thickness="3" class="border-opacity-100" color="teal-accent-4"></v-divider>
    <div><TheMainMenu /></div>
    <v-divider :thickness="3" class="border-opacity-100 mt-4" color="teal-accent-4"></v-divider>
    <div class="mt-5"><v-img :src='banner' cover  aspect-ratio="16/9" class="rounded-xl"> </v-img></div>
  </v-container>
</template>
<script>
import TheUserRequests from "~/components/TheUserRequests.vue";
import TheMainMenu from "~/components/TheMainMenu.vue";
import banner from "~/assets/img/pics/banner.jpg"
export default {
  components: { TheUserRequests, TheMainMenu },
  setup(){
    definePageMeta({
      layout: 'main',
    });
    return {banner}
  }
};
</script>
<style></style>
