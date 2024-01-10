<template>
  <v-snackbar color="error" rounded="pill" location="top" v-model="errorActive" timeout="3000">
    <template v-slot:activator="{ props }"> </template>
    <p class="text text-center">مشکلی پیش آمده از اتصال اینترنت خود مطمئن شوید</p>
  </v-snackbar>
</template>
<script>
export default {
  props: {
    errorActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const errorActive = computed({
      get() {
        return props.errorActive;
      },
      set(newVal) {
        emit("update:errorActive", newVal);
      },
    });
    return { errorActive };
  },
};
</script>
