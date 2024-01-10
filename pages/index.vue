<template>
  <BaseErrorAlert :errorActive="error" @update:errorActive="updateErrorAlert" />
  <v-form class="text-right login text-title" @submit.prevent="phoneSubmit" ref="formRef">
    <v-row class="mt-7 pa-3 d-flex justify-center" no-gutters>
      <v-col xl="7" lg="7" md="8" sm="10" xs="12" cols="12"
        ><p>شماره تلفن همراه خود را وارد کنید</p></v-col
      >
      <v-col class="mt-5" xl="7" lg="7" md="8" sm="10" xs="12" cols="12">
        <v-text-field
          variant="underlined"
          prepend-inner-icon="mdi-cellphone"
          label="تلفن همراه"
          color="teal-accent-4"
          placeholder="09121111111"
          class="align"
          :loading="loading"
          v-model="phoneNum"
          :rules="rules"
        ></v-text-field>
      </v-col>
      <v-col class="mt-3" xl="7" lg="7" md="8" sm="10" xs="12" cols="12">
        <p style="direction: rtl">
          با ورود و یا ثبت نام در آسیاسلامت
          <a class="text-teal-accent-4">قوانین و مقررات</a> استفاده از پلتفرم آسیاسلامت و همچنین
          قوانین مربوط به <a class="text-teal-accent-4">حریم خصوصی</a> را می پذیرید.
        </p>
      </v-col>
    </v-row>
    <v-container class="submit-btn">
      <v-row class="d-flex justify-center">
        <v-col xl="7" lg="7" md="8" sm="10" xs="12" cols="12">
          <v-btn
            color="teal-accent-4"
            :disabled="!phoneNumValid(phoneNum) || error"
            block
            :loading="loading"
            type="submit"
            >ورود/ثبت نام</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { useAuthentication } from "~/store/auth";
export default {
  setup() {
    definePageMeta({
      key: (route) => route.fullPath,
      layout: "login",
      middleware: ["is-logged", "not-logged"],
    });
    const config = useRuntimeConfig();
    const router = useRouter();
    const store = useAuthentication();
    const phoneNum = ref("");
    const formRef = ref(null);
    const loading = ref(false);
    const error = ref(false);
    const updateErrorAlert = (newVal) => {
      error.value = newVal;
    };
    const phoneNumValid = (val) => {
      return val?.length === 11 && /[0-9-]+/.test(val) && /^09\d{9}$/.test(val);
    };
    const rules = ref([
      (value) =>
        phoneNumValid(value) || "شماره تلفن را به درستی وارد کنید(از اعداد انگلیسی استفاده کنید)",
    ]);
    const phoneSubmit = async () => {
      const { valid } = await formRef.value.validate();
      if (valid) {
        loading.value = true;
        try {
          const response = await useFetch(
            config.public.baseURL + `/send-sms?phoneNumber=${phoneNum.value}`
          );
          console.log(response);
          if (response.status.value === "success") {
            store.PhoneNumber = phoneNum.value;
            router.push("/confirm");
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
      }
    };
    onMounted(() => {
      phoneNum.value = store.PhoneNumberGet;
    });
    return {
      phoneSubmit,
      rules,
      phoneNum,
      formRef,
      error,
      loading,
      phoneNumValid,
      updateErrorAlert,
    };
  },
};
</script>
<style lang="scss">
.login {
  .v-text-field input.v-field__input {
    text-align: right !important;
  }
  .v-field-label--floating,
  .v-field-label {
    right: 10px !important;
  }
  .submit-btn {
    position: absolute !important;
    bottom: 10px;
    width: 100vw;
    max-width: 100vw;
  }
  .v-messages__message {
    margin-top: 0.5rem;
    hyphens: none !important;
    line-height: 14px !important;
  }
}
</style>
