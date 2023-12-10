<template>
  <v-layout>
    <v-container class="w-100 pa-0 navigation">
      <v-tabs
        class="mr-9 d-flex align-center w-100"
        color="teal-accent-4"
        fixed-tabs
        centered
        stacked
        v-model="tabs"
      >
        <NuxtLink to="/home"
          ><v-tab class="tabs" value="one"><v-icon>mdi-home</v-icon>خانه</v-tab></NuxtLink
        >
        <NuxtLink to="/support">
          <v-tab class="tabs" value="two"><v-icon>mdi-support</v-icon> پشتیبانی</v-tab></NuxtLink
        >
      </v-tabs>
    </v-container>
  </v-layout>
</template>
<script>
export default {
  setup() {
    const route = useRoute();
    const currentTab = ref("");
    const tabs = computed({
      get() {
        if (route.fullPath === "/support") {
          return (currentTab.value = "two");
        } else {
          return (currentTab.value = "one");
        }
      },
      set(newVal) {
        currentTab.value = newVal;
      },
    });
    return { tabs };
  },
};
</script>
<style></style>
