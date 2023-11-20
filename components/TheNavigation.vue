<template>
  <v-layout>
    <v-container class="w-100" style="padding: 0 !important">
      <v-tabs
        class="mr-9 d-flex align-center w-100 "
        color="teal-accent-4"
        fixed-tabs
        centered
        stacked
      >
      <NuxtLink to="/home"
          ><v-tab class="tabs" default><v-icon>mdi-home</v-icon>خانه</v-tab></NuxtLink
        >
        <NuxtLink to="/support">
          <v-tab class="tabs"><v-icon>mdi-support</v-icon> پشتیبانی</v-tab></NuxtLink
        >
        
      </v-tabs>
    </v-container>
  </v-layout>
</template>
<script></script>
<style scope>
.tabs {
  letter-spacing: 0 !important;
  height: 70px !important;
}
.v-slide-group-item--active {
  border: none !important;
  outline: none !important;
}
.v-slide-group__container {
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: white;
}
a {
  width: 50%;
}
button {
  width: 100%;
}
</style>
