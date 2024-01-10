<template>
  <BaseErrorAlert :errorActive="error" @update:errorActive="updateErrorAlert" />
  <v-snackbar
    :timeout="3000"
    color="teal-accent-4"
    rounded="pill"
    location="top"
    v-model="resendCodeSuccessful"
  >
    <template v-slot:activator="{ props }"> </template>
    <p class="text text-center">کد مجدد ارسال شد</p>
  </v-snackbar>
  <v-form @submit.prevent="confirmCode" class="confirm">
    <v-col class="text-center text-grey-darken-2 font-weight-bold mt-5">
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
      <v-col cols="8" class="d-flex pa-0 mx-auto">
        <v-chip color="teal-accent-4" @click="changeNumber">
          <p class="text">تغییر شماره موبایل</p>
        </v-chip>
      </v-col>
      <p class="text-error text-body-2 mb-4" v-if="codeError">
        کد وارد شده صحیح نیست دوباره تلاش کنید
      </p>

      <v-btn class="text-teal-accent-4" size="large" v-if="resendCode" @click="resendCodeHandler"
        >ارسال مجدد کد</v-btn
      >
      <p v-else class="mt-4">ارسال مجدد کد در : {{ timer }}</p>
    </v-col>

    <v-container class="submit-btn">
      <v-row class="d-flex justify-center">
        <v-col xl="7" lg="7" md="8" sm="10" xs="12" cols="12">
          <v-btn
            :disabled="otp.length < 4 || codeLoading"
            color="teal-accent-4"
            block
            :loading="codeLoading"
            type="submit"
            >تایید</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { VOtpInput } from "vuetify/lib/labs/components.mjs";
import { useAuthentication } from "~/store/auth";
export default {
  components: { VOtpInput },
  setup() {
    definePageMeta({
      layout: "login",
    });
    const router = useRouter();
    const store = useAuthentication();
    const cookie = useCookie("userToken");
    const config = useRuntimeConfig();
    const otp = ref("");
    const codeLoading = ref(false);
    const codeError = ref(false);
    const resendCode = ref(false);
    const resendCodeSuccessful = ref(false);
    const timer = ref("00" + ":" + "59");
    const phoneNum = computed(() => {
      return store.PhoneNumberGet;
    });
    const error = ref(false);
    const updateErrorAlert = (newVal) => {
      error.value = newVal;
    };
    const resendCodeHandler = async () => {
      try {
        const response = await useFetch(
          config.public.baseURL + `/send-sms?phoneNumber=${phoneNum.value}`
        );
        console.log(response);
        if (response.status.value === "success") {
          resendCodeSuccessful.value = true;
          codeError.value = false;
          resendCode.value = !resendCode.value;
          timer.value = "00" + ":" + "59";
          startTimer();
          otp.value = "";
        }
        if (response.error.value) {
          loading.value = false;
          error.value = true;
        }
      } catch (e) {
        console.log(e);
        loading.value = false;
        error.value = true;
      }
    };
    watch(otp, (newVal) => {
      if (newVal.length >= 4) {
        confirmCode();
      }
    });
    const confirmCode = async () => {
      codeLoading.value = true;
      if (otp.value.length >= 4) {
        let response;
        try {
          response = await useFetch(config.public.baseURL + "/check-sms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phoneNumber: phoneNum.value,
              code: otp.value,
            }),
          });
        } catch (e) {
          console.log(e);
          error.value = true;
        }
        if (response.status.value === "success") {
          codeLoading.value = false;
          router.push("/home");
          store.accessToken = response.data.value.Token;
          cookie.value = response.data.value.Token;
        } else if (response.error.value) {
          codeLoading.value = false;
          if (response.error.value.data) {
            codeError.value = true;
          } else {
            error.value = true;
          }
        }
      }
    };
    const changeNumber = () => {
      router.push("/");
    };
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
      }
      if (sec < 0) {
        sec = "59";
      }
      return sec;
    }

    onMounted(() => {
      startTimer();
    });
    return {
      otp,
      confirmCode,
      timer,
      resendCode,
      resendCodeHandler,
      changeNumber,
      codeLoading,
      codeError,
      error,
      updateErrorAlert,
      resendCodeSuccessful,
    };
  },
};
</script>
<style lang="scss">
.confirm {
  .submit-btn {
    position: absolute !important;
    bottom: 10px;
    width: 100vw;
    max-width: 100vw;
  }
}
</style>
