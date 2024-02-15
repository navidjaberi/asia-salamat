<template>
  <KeepAlive>
    <div>
      <VApp>
        <GlobalPageBaseLayout
          title="اطلاعات شخصی"
          formClass="personal-info"
          :firstIndex="true"
          @baseRouteBackHandler="routBackHandler"
          @baseSubmit="submit"
        >
          <BaseLoadingAndError :loading="loading" :error="error" class="mb-3" :postData="true" />
          <BasePurchaseModal
            :dialog="openModal"
            @update:dialog="updateDialog"
            @cashPurchasePay="cashPayment"
            @installmentPurchasePay="installmentPayment"
          />
          <v-row>
            <v-col
              xxl="5"
              xl="6"
              lg="7"
              md="8"
              cols="12"
              class="pa-0 mx-auto"
              v-for="(i, index) in inputFields"
              :key="i"
            >
              <v-text-field
                v-if="showCondition(i)"
                variant="underlined"
                :label="i.title"
                color="teal-accent-4"
                class="align py-2 px-3"
                :rules="rulesConditions(i)"
                :model-value="formData[i.id]"
                :type="i.mode"
                @update:model-value="updateFormData(i.id, $event)"
                required
              >
                <template v-slot:error>
                  <p class="text-teal-accent-4"></p>
                </template>
                <template v-slot:append>
                  <span class="text-error" v-if="i.required">*</span>
                  <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1"
                    >{{ i.icon }}
                  </v-icon>
                </template>
              </v-text-field>
              <ClientOnly>
                <v-col cols="12" class="date-picker" v-if="i.type === 'date'">
                  <div class="date-picker--div">
                    <Vue3PersianDatetimePicker
                      v-if="i.type === 'date'"
                      input-format="jYYYY/jMM/jDD"
                      class="date-picker px-3"
                      div-class="pdp-group date-picker"
                      v-model="date"
                      mode="single"
                      color="#00BFA5"
                      :placeholder="i.title"
                    >
                    </Vue3PersianDatetimePicker>
                    <div class="mt-2">
                      <div class="birthday-error" v-if="birthdayError">
                        تاریخ تولد خود را وارد کنید
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-center justify-end" style="padding: 0px">
                    <span class="text-error" v-if="i.required">*</span>
                    <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1"
                      >{{ i.icon }}
                    </v-icon>
                  </div>
                </v-col>
              </ClientOnly>
              <v-chip-group
                v-model="educationSelect"
                v-if="i.type === 'chips'"
                selected-class="text-teal-accent-4"
                mandatory
              >
                <v-col
                  cols="9"
                  xl="10"
                  lg="10"
                  md="10"
                  xxl="10"
                  class="pa-0 my-5 d-flex justify-center"
                >
                  <v-row no-gutters>
                    <v-col class="pa-0 px-2">
                      <v-chip
                        >فوق<br />
                        لیسانس</v-chip
                      ></v-col
                    >
                    <v-col class="pa-0 px-2">
                      <v-chip>لیسانس</v-chip>
                    </v-col>
                    <v-col class="pa-0 px-2">
                      <v-chip
                        >فوق<br />
                        دیپلم</v-chip
                      ></v-col
                    >
                    <v-col class="pa-0 px-2"> <v-chip>دیپلم</v-chip></v-col>
                    <v-col class="pa-0 px-2"> <v-chip>سیکل</v-chip></v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="3"
                  xl="2"
                  lg="2"
                  md="2"
                  xxl="2"
                  class="pa-0 d-flex align-center justify-end"
                >
                  <p class="text-right text-title">{{ i.title }}</p>
                </v-col>
              </v-chip-group>
              <v-autocomplete
                v-if="i.type === 'autoCompleteState'"
                :label="i.title"
                :items="states"
                variant="underlined"
                color="teal-accent-4"
                class="align px-3"
                :rules="rules.stateSelect"
                menu-icon=""
                v-model="selectedState"
                :counter="false"
              >
                <template v-slot:append>
                  <span class="text-error">*</span>
                  <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1">
                    {{ i.icon }}
                  </v-icon>
                </template></v-autocomplete
              >
              <v-autocomplete
                v-if="i.type === 'autoCompleteCity'"
                :label="i.title"
                :items="getCitiesByStates(selectedState)"
                variant="underlined"
                color="teal-accent-4"
                class="align px-3"
                :rules="rules.citySelect"
                menu-icon=""
                v-model="selectedCity"
                :counter="false"
              >
                <template v-slot:append>
                  <span class="text-error">*</span>
                  <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1">
                    {{ i.icon }}
                  </v-icon>
                </template></v-autocomplete
              >
            </v-col>
          </v-row>
        </GlobalPageBaseLayout>
      </VApp>
    </div>
  </KeepAlive>
</template>
<script>
import formInputs from "~/components/EmploymentForms/PersonalInfo/formInput";
import cityJson from "~/components/EmploymentForms/PersonalInfo/city.json";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
import { useNurseInfoStore } from "~/store/nurseInfo";
export default {
  components: { Vue3PersianDatetimePicker },
  props: {
    nurseForm: {
      type: Boolean,
      required: true,
    },
    routeKeyword: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();
    const routes = useRoute();
    const loading = ref(false);
    const error = ref(false);
    const paymentUrl = ref("");
    //get the route title for back button and local Storage key in classes mode
    const routeTitle = ref(uesGetRoute(routes.fullPath, props.routeKeyword));
    //get previous route title for back button
    const getPreRouteTitle = ref(routeTitle.value.replace("/personal-info", "/details"));
    //get the local storage key for accessing information
    const localKey = ref(routeTitle.value.replace("/personal-info", ""));
    //get local storage items
    const localItems = ref(localStorage.getItem(localKey.value));
    const store = useNurseInfoStore();
    const inputFields = ref(formInputs);
    const cities = ref(cityJson);
    const date = ref("");
    const isInstallment = ref(false);
    const formData = ref({});
    const classData = ref({});
    const openModal = ref(false);
    const birthdayError = ref(false);
    const educationSelect = ref();
    //make conditions for form's differences in different modes
    const showCondition = (i) => {
      if (props.nurseForm) {
        return i.nurseForm;
      } else {
        return i.academyForm;
      }
    };
    //make the education options modal value readable
    const educationOptions = computed({
      get: () => {
        if (educationSelect.value === 0) {
          return "فوق لیسانس";
        } else if (educationSelect.value === 1) {
          return "لیسانس";
        } else if (educationSelect.value === 2) {
          return "فوق دیپلم";
        } else if (educationSelect.value === 3) {
          return "دیپلم";
        } else if (educationSelect.value === 4) {
          return "سیکل";
        }
      },
      set: (newValue) => {
        switch (newValue) {
          case "فوق لیسانس":
            educationSelect.value = 0;
            break;
          case "لیسانس":
            educationSelect.value = 1;
            break;
          case "فوق دیپلم":
            educationSelect.value = 2;
            break;
          case "دیپلم":
            educationSelect.value = 3;
            break;
          case "سیکل":
            educationSelect.value = 4;
            break;
          default:
            break;
        }
      },
    });
    //config for state and city selects which bring each state's cities
    const states = ref(Object.keys(cities.value));
    const getCitiesByStates = (states) => {
      return states ? cities.value[states] : [];
    };
    const selectedState = ref(null);
    const selectedCity = ref(null);
    const updateFormData = (name, value) => {
      formData.value = { ...formData.value, [name]: value };
    };
    //all forms validations rules
    const rules = ref({
      text: [
        (value) => {
          if (/[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]$/.test(value)) return true;
          return "(از کیبورد فارسی استفاده کنید)فیلد اجباری را پر کنید";
        },
      ],
      Num: [
        (value) => {
          if (
            (value?.length === 11 && /[0-9-]+/.test(value) && /^09\d{9}$/.test(value)) ||
            (/[۰-۹-]+/.test(value) && /^۰۹[۰-۹]{9}$/.test(value))
          )
            return true;
          return "شماره تلفن را به درستی وارد کنید";
        },
      ],
      nationalCode: [
        (value) => {
          if (/^[0-9]{10}$/.test(value) || /^[۰-۹]{10}$/.test(value)) return true;
          return "کد ملی را به درستی وارد کنید";
        },
      ],
      postalCode: [
        (value) => {
          if (/^[0-9]{10}$/.test(value) || /^[۰-۹]{10}$/.test(value)) return true;
          return "کد پستی را به درستی وارد کنید";
        },
      ],
      nationalNumber: [
        (value) => {
          if (/^[0-9]+/.test(value) || /^[۰-۹]+/.test(value)) return true;
          return "شماره شناسنامه را به درستی وارد کنید";
        },
      ],
      stateSelect: [
        () => {
          if (selectedState.value) return true;
          return " استان خود را انتخاب کنید";
        },
      ],
      citySelect: [
        () => {
          if (selectedCity.value) return true;
          return " شهر خود را انتخاب کنید";
        },
      ],
    });
    //open the purchase modal for classes form mode
    const updateDialog = (newVal) => {
      openModal.value = newVal;
    };
    //make rules conditions readable
    const rulesConditions = (i) => {
      if (i.type === "text" && i.required) {
        return rules.value.text;
      } else if (i.type === "Num" && i.required) {
        return rules.value.Num;
      } else if (i.type === "nationalCode") {
        return rules.value.nationalCode;
      } else if (i.type === "postalCode") {
        return rules.value.postalCode;
      } else if (i.type === "nationalNumber") {
        return rules.value.nationalNumber;
      }
    };
    //function for posting classes data
    const postData = async (classesData) => {
      try {
        const data = await useMyFetch(
          "/ClassCategory/Reserve",
          loading,
          error,
          "post",
          "",
          classesData
        );
        localStorage.removeItem("academyPersonalInfo");
        if (data) {
          error.value = false;
          openModal.value = true;
          paymentUrl.value = data;
        }
      } catch (error) {
        error.value = true;
        console.error("Error fetching data:", error);
      }
    };
    // make a request for posting classes data
    const submitPostingData = () => {
      classData.value = {
        isInstallment: isInstallment.value,
        ...JSON.parse(localItems.value),
      };
      postData(classData.value);
      //a timeout for closing modal and scroll to the top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 400);
    };
    const forwardToPayment = () => {
      const newTab = window.open("", "_blank");
      setTimeout(() => {
        newTab.document.write("درحال انتقال به سایت پذیرنده");
        newTab.location.href = paymentUrl.value;
      }, 800);
      if (newTab == null) {
        error.value = true;
      } else {
        setTimeout(() => {
          router.push("/support-contact");
        }, 2000);
      }
    };
    //post classes data as installment payment
    const installmentPayment = () => {
      isInstallment.value = true;
      forwardToPayment();
    };
    //post classes data as cash payment
    const cashPayment = async () => {
      isInstallment.value = false;
      forwardToPayment();
    };
    //function for next button in the forms and store data in local storage
    const submit = async (valid) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (!date.value) {
        birthdayError.value = true;
      }
      if (valid && date.value) {
        formData.value = {
          ...formData.value,
          education: educationOptions.value,
          birthday: date.value,
          province: selectedState.value,
          city: selectedCity.value,
          Address: selectedState.value + "،" + selectedCity.value,
        };

        if (props.nurseForm) {
          store.info = formData.value;
          localStorage.setItem("employmentPersonalInfo", JSON.stringify(formData.value));
          router.push("/employment/personal-records");
        } else {
          submitPostingData();
          localStorage.setItem("academyPersonalInfo", JSON.stringify(formData.value));
        }
      }
    };
    //function for back button in form  and store data in local storage
    const routBackHandler = () => {
      if (props.nurseForm) {
        router.push("/home");
      } else {
        localStorage.setItem("academyPersonalInfo", JSON.stringify(formData.value));
        router.push(`/academy/${props.routeKeyword}${getPreRouteTitle.value}`);
      }
    };
    //check if local storage have item for each form modes
    const getItemsFromLocalStorage = () => {
      if (props.nurseForm && localStorage.getItem("employmentPersonalInfo")) {
        formData.value = JSON.parse(localStorage.getItem("employmentPersonalInfo"));
      } else if (!props.nurseForm && localStorage.getItem("academyPersonalInfo")) {
        formData.value = JSON.parse(localStorage.getItem("academyPersonalInfo"));
      } else {
        formData.value = {};
        educationSelect.value = 4;
      }
      educationOptions.value = formData.value.education;
      date.value = formData.value.birthday;
      selectedState.value = formData.value.province;
      selectedCity.value = formData.value.city;
    };
    onMounted(() => {
      getItemsFromLocalStorage();
      //check if local storage does not have previous step information, redirect to previous steps in classes form mode
      if (!props.nurseForm && !localItems.value) {
        router.push(`/academy/${props.routeKeyword}${localKey.value}`);
      }
    });
    return {
      inputFields,
      educationOptions,
      error,
      loading,
      submit,
      rules,
      states,
      getCitiesByStates,
      selectedState,
      selectedCity,
      date,
      installmentPayment,
      cashPayment,
      routBackHandler,
      formData,
      updateFormData,
      educationSelect,
      birthdayError,
      rulesConditions,
      updateDialog,
      openModal,
      showCondition,
    };
  },
};
</script>
<style>
.v-toolbar__content {
  justify-content: center !important;
}
</style>
