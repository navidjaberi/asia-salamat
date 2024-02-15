<template>
  <BaseErrorAlert :errorActive="error" @update:errorActive="updateErrorAlert" />
  <v-form class="text-right login text-title" @submit.prevent="phoneSubmit" ref="formRef">
    <v-row class="mt-7 px-3 py-1 d-flex justify-center" no-gutters>
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
          type="tel"
          :rules="rules"
        ></v-text-field>
      </v-col>
      <v-col class="mt-5" xl="7" lg="7" md="8" sm="10" xs="12" cols="12">
        <p style="direction: rtl" class="text">
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
<script lang="ts">
import { useAuthentication } from "~/store/auth";
export default defineComponent({
  name: "login",
  setup() {
    definePageMeta({
      layout: "login",
    });
    const config = useRuntimeConfig();
    const router = useRouter();
    const store = useAuthentication();
    const phoneNum = ref<string>("");
    const formRef = ref<any>(null);
    const loading = ref<boolean>(false);
    const error = ref<boolean>(false);
    //open error Alert emitted from base component
    const updateErrorAlert = (newVal: boolean) => {
      error.value = newVal;
    };
    //phone validation
    const phoneNumValid = (val: string): boolean => {
      return val?.length === 11 && /[0-9-]+/.test(val) && /^09\d{9}$/.test(val);
    };
    //phone validation rules
    const rules = ref([
      (value: string) =>
        phoneNumValid(value) || "شماره تلفن را به درستی وارد کنید",
    ]);
    //submit the phone data
    const phoneSubmit = async () => {
      const { valid } = await formRef.value.validate();
      if (valid) {
        try {
          const data = await useMyFetch(
            `/send-sms?phoneNumber=${phoneNum.value}`,
            loading,
            error,
            "get"
          );
          if (!error.value) {
            router.push("/confirm");
            store.PhoneNumber = phoneNum.value;
          }
        } catch (err) {
          error.value = true;
          console.error("Error fetching data:", err);
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
});
</script>
