<template>
  <div>
    <VApp>
      <v-app-bar
        color="grey-lighten-5
"       :height=50
        elevation="1"
      >
      </v-app-bar>
      <v-main>
        <slot />
      </v-main>
    </VApp>
  </div>
</template>
<script>
export default {};
</script>
