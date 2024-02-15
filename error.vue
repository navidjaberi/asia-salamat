<template>
  <v-container class="d-flex justify-center align-center  text-center p-5 h-screen">
    <v-row>
      <v-col cols="12" class="mt-n13">
        <img :src="logo" :width="150" :height="150"  alt="Asiasalamat logo" /></v-col>
        <v-col class="mt-n13">
        <h2>{{ error?.statusCode}}</h2>
        <p class="">صفحه مورد نظر یافت نشد</p></v-col>
      <v-col class="agree-btn" lg="6" xl="5" xxl="5" md="7" cols="12">
        <v-btn color="teal-accent-4" type="submit" block @click="handleError">بازگشت</v-btn></v-col
      >
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import type { NuxtError } from "#app";
import logo from "~/assets/img/icons/ic_launcher_monochrome.png";
const props = defineProps({
  error: Object as () => NuxtError,
});
const handleError = () => clearError({ redirect: "/" });
</script>
