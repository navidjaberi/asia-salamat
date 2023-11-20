<template>
  <form @submit.prevent="confrimCode" class="confirm">
    <v-container>
      <v-col class="text-center text-grey-darken-2 font-weight-bold">
        <p>لطفا کد ارسال شده را وارد کنید</p>
        <VOtpInput
          v-model="otp"
          length="4"
          base-color="text-grey-darken-2"
          color="teal-accent-4"
          class="mt-3 mb-2"
          type="number"
          :error="codeError"
          :loading="codeLoading"
        ></VOtpInput>
        <p class="text-error text-body-2 mb-4" v-if="codeError">
          کد وارد شده صحیح نیست لطفا دوباره تلاش کنید
        </p>

        <v-btn class="text-teal-accent-4" size="large" v-if="resendCode" @click="resendCodeHandler"
          >ارسال مجدد کد</v-btn
        >
        <p v-else>ارسال مجدد کد در : {{ timer }}</p>
      </v-col>

      <v-container class="submit-btn">
        <v-btn :disabled="otp.length < 4 || codeLoading" color="teal-accent-4" block type="submit"
          >تایید</v-btn
        ></v-container
      >
    </v-container>
  </form>
</template>
<script>
import { VOtpInput } from "vuetify/lib/labs/components.mjs";
export default {
  components: { VOtpInput },
  setup() {
    definePageMeta({
      layout: "login",
    });
    const router = useRouter();
    const otp = ref("");
    const codeLoading = ref(false);
    const codeError = ref(false);
    const resendCode = ref(false);
    const timer = ref("01" + ":" + "59");
    const resendCodeHandler = () => {
      resendCode.value = !resendCode.value;
      timer.value = "01" + ":" + "59";
      startTimer();
      otp.value = "";
      codeError.value = false;
    };
    const confrimCode = () => {
      codeLoading.value = true;
      if (otp.value == 1111) {
        codeLoading.value = false;
        router.push("/home");
      } else {
        codeError.value = true;
        codeLoading.value = false;
        return;
      }
    };

    startTimer();
    function startTimer() {
      let presentTime = timer.value;
      let timeArray = presentTime.split(/[:]+/);
      let m = timeArray[0];
      let s = checkSecond(timeArray[1] - 1);
      if (s == 59) {
        m = m - 1;
      }
      if (m < 0) {
        resendCode.value = true;
        return;
      }

      timer.value = m + ":" + s;
      setTimeout(startTimer, 1000);
    }
    function checkSecond(sec) {
      if (sec < 10 && sec >= 0) {
        sec = "0" + sec;
      } // add zero in front of numbers < 10
      if (sec < 0) {
        sec = "59";
      }
      return sec;
    }

    return { otp, confrimCode, timer, resendCode, resendCodeHandler, codeLoading, codeError };
  },
};
</script>
<style lang="scss">
.confirm{
.submit-btn {
  position: absolute !important;
  bottom: 0px;
  width: 100vw;
  max-width: 100vw;
  left: 50%;
  transform: translate(-50%, -50%);
}}
</style>
