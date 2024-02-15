<template>
  <v-container class="d-flex justify-center align-center text-center p-5 h-screen">
    <v-row>
      <v-col>
        <p class="">
          کارشناسان ما در کمتر از ۳۰ دقیقه آینده با شما جهت ارائه توضیحات بیشر تماس میگیرند
        </p></v-col
      >
      <v-col class="agree-btn" lg="6" xl="5" xxl="5" md="7" cols="12">
        <v-btn color="teal-accent-4" type="submit" block @click="submit">تایید</v-btn></v-col
      >
    </v-row>
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
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translate(-50%, 50%);
}
</style>
