<template>
  <v-snackbar
    :timeout="2000"
    color="teal-accent-4"
    rounded="pill"
    location="top"
    v-model="alertActive"
  >
    <template v-slot:activator="{ props }"> </template>
    <p class="text text-center">{{ text }}</p>
  </v-snackbar>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    alertActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const alertActive = computed({
      get() {
        return props.alertActive;
      },
      set(newVal) {
        emit("update:alertActive", newVal);
      },
    });
    return { alertActive };
  },
};
</script>
