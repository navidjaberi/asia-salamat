<template>
  <v-container class="d-flex justify-center align-center text-center p-5" style="height: 100vh">
    <p class="font-weight-bold">
      کارشناسان ما در کمتر از ۳۰ دقیقه آینده با شما جهت ارائه توضیحات بیشر تماس میگیرند
    </p>
    <v-btn color="teal-accent-4" type="submit" class="agree-btn" @click="submit">تایید</v-btn>
  </v-container>
</template>
<script>
export default {
  setup() {
    const router = useRouter();
    const submit = () => {
      router.push("/home");
    };
    return {
      submit,
    };
  },
};
</script>
<style>
.agree-btn {
  position: absolute !important;
  bottom: 10px;
  width: 95vw;
}
</style>
