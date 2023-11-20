<template>
  <form class="text-right login" style="font-size: 0.9rem" @submit.prevent="phoneSubmit">
    <v-container class="mt-5">
      <div><p>شماره تلفن همراه خود را وارد کنید</p></div>
      <div class="mt-4">
        <v-text-field
          variant="underlined"
          prepend-inner-icon="mdi-cellphone"
          label="تلفن همراه"
          color="teal-accent-4"
          placeholder="09121111111"
          class="align"
          v-model="phoneNum"
          :rules="rules"
        ></v-text-field>
      </div>
      <div class="mt-3">
        <p style="direction: rtl">
          با ورود و یا ثبت نام در آسیاسلامت
          <a class="text-teal-accent-4">قوانین و مقررات</a> استفاده از پلتفرم آسیاسلامت و همچنین
          قوانین مربوط به <a class="text-teal-accent-4">حریم خصوصی</a> را می پذیرید.
        </p>
      </div>
    </v-container>
    <v-container class="submit-btn">
      <v-btn
        color="teal-accent-4"
        :disabled="
          !phoneNum ||
          phoneNum?.length !== 11 ||
          !/[0-9-]+/.test(phoneNum) ||
          !/^09\d{9}$/.test(phoneNum) 
        "
        block
        type="submit"
        >ورود/ثبت نام</v-btn
      >
    </v-container>
  </form>
</template>
<script>
definePageMeta({
  layout: "login",
});

export default {
  setup() {
    const router = useRouter();
    const phoneNum=ref()
    const rules = ref([
      (value) => {
        return (value?.length === 11 && /[0-9-]+/.test(value) && /^09\d{9}$/.test(value) ||
          "شماره تلفن را به درستی وارد کنید(از اعداد انگلیسی استفاده کنید)")
      },
    ]);

    const phoneSubmit = () => {
      console.log(phone.value.value);
      router.push("./confirm");
    }
    return { phoneSubmit,rules ,phoneNum};
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
    bottom: 0px;
    width: 100vw;
    max-width: 100vw;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0px 10px !important;
  }
  .v-messages__message{
    margin-top: 0.5rem;
    hyphens:none!important
  }
}
</style>
