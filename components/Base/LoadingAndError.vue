<template>
  <div class="text-center mt-4 px-2">
    <v-progress-circular v-if="loading" indeterminate color="teal-accent-4"></v-progress-circular>
    <v-alert type="error" variant="tonal" v-if="error">
      <p class="text">
        مشکلی پیش آمده.اتصال به اینترنت را بررسی کنید و دوباره امتحان کنید
      </p></v-alert
    >
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup() {},
};
</script>
