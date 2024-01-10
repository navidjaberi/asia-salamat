<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="اطلاعات شخصی"
        formClass="personal-info"
        :bottomBtn="true"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <v-row no-gutters class="px-3">
          <v-col xxl="5" xl="6" lg="7" md="8" cols="12" class="mx-auto">
            <v-text-field
              variant="underlined"
              label="نام و نام خانوادگی"
              v-model="info.name"
              color="teal-accent-4"
              class="align py-2 px-3"
              :rules="rules.text"
              required
            >
              <template v-slot:error>
                <p class="text-teal-accent-4"></p>
              </template>
              <template v-slot:append>
                <span class="text-error">*</span>
                <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1">mdi-account </v-icon>
              </template>
            </v-text-field>
            <v-text-field
              variant="underlined"
              label="شماره همراه"
              v-model="info.phoneNumber"
              color="teal-accent-4"
              class="align py-2 px-3"
              :rules="rules.num"
              required
            >
              <template v-slot:error>
                <p class="text-teal-accent-4"></p>
              </template>
              <template v-slot:append>
                <span class="text-error">*</span>
                <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1">mdi-phone </v-icon>
              </template>
            </v-text-field>
            <v-text-field
              variant="underlined"
              label="نحوه آشنایی با ما"
              v-model="info.howToKnow"
              color="teal-accent-4"
              class="align py-2 px-3"
              required
            >
              <template v-slot:error>
                <p class="text-teal-accent-4"></p>
              </template>
              <template v-slot:append>
                <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1"
                  >mdi-human-greeting-proximity</v-icon
                >
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script>;
export default {
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const routes = useRoute();
    const router = useRouter();
    const currentRoute = ref(routes.fullPath.substring(0, routes.fullPath.indexOf("/info")));
    const form = ref(null);
    const info = ref({
      name: "",
      phoneNumber: "",
      howToKnow: "",
    });
    const rules = ref({
      text: [
        (value) => {
          if (value) return true;
          return "لطفا فیلد اجباری را پر کنید";
        },
      ],
      num: [
        (value) => {
          if (value?.length === 11 && /[0-9-]+/.test(value) && /^09\d{9}$/.test(value)) return true;
          return "شماره تلفن را به درستی وارد کنید(از اعداد انگلیسی استفاده کنید)";
        },
      ],
    });
    const localKey = computed(() => {
      if (props.mode === "child") {
        return "nurseReserveChild-info";
      } else if (props.mode === "elder") {
        return "nurseReserveElder-info";
      } else if (props.mode === "sick") {
        return "nurseReserveSick-info";
      }
    });
    const submit = async (valid) => {
      if (valid) {
        const prevStepLocalKey = localKey.value.substring(0, localKey.value.indexOf("-info"));
        localStorage.removeItem(localKey.value);
        localStorage.removeItem(prevStepLocalKey);
        router.push(`${currentRoute.value}/support`);
      }
    };
    const routBackHandler = () => {
      localStorage.setItem(localKey.value, JSON.stringify(info.value));
      router.push(currentRoute.value);
    };
    onMounted(() => {
      if (localStorage.getItem(localKey.value)) {
        info.value = JSON.parse(localStorage.getItem(localKey.value));
      }
    });
    return {
      form,
      rules,
      submit,
      routBackHandler,
      info,
    };
  },
};
</script>
