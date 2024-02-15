<template>
  <div class="text-center mt-4 px-2">
    <v-progress-circular v-if="loading" indeterminate color="teal-accent-4"></v-progress-circular>
    <v-alert type="error" variant="tonal" v-else-if="error" class="d-flex justify-center">
      <p class="text">مشکلی پیش آمده.اتصال به اینترنت را بررسی کنید و دوباره امتحان کنید</p>
      <template v-slot:append v-if="!postData">
        <v-btn
          icon="mdi-reload"
          variant="text"
          color="grey-darken-2"
          size="medium"
          class="align-self-start"
          @click="reload"
        ></v-btn>
      </template>
    </v-alert>
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
    postData:{
      type:Boolean,
      required:true
    }
  },
  emits: ["reload"],
  setup(props, context) {
    const reload = () => {
      context.emit("reload");
    };
    return { reload };
  },
};
</script>
