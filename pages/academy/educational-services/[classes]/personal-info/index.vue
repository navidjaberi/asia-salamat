<template>
  <div>
    <VApp>
      <pageBaseLayout
        title="اطلاعات شخصی"
        formClass="personal-info"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <v-dialog transition="dialog-bottom-transition" width="auto">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">From the bottom</v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card class="rounded-xl">
              <v-toolbar color="teal-accent-4"
                ><p class="text-center text-title font-weight-bold pa-5">
                  نحوه پرداخت خود را انتخاب کنید
                </p></v-toolbar
              >
              <v-card-text>
                <v-row>
                  <v-col cols="6" 
                    ><v-img :width= 100  :height=120 class="mx-auto" :src="installmentPurchase"></v-img
                  >
                <p class="text font-weight-bold text-center">پرداخت نقدی<br>(آنلاین)</p>
                </v-col>
                  <v-divider vertical></v-divider>
                  <v-col  cols="6" 
                    ><v-img :width="160" :height="120"  :src="cashPurchase"></v-img
                  > <p class="text font-weight-bold text-center">پرداخت اقساطی<br>(آنلاین)</p></v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn variant="text" @click="isActive.value = false">بستن</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
        <v-row>
          <v-col cols="12" v-for="(i, index) in inputFields" :key="i" style="padding: 0px">
            <v-text-field
              v-if="i.type === 'text' || i.type === 'number'"
              variant="underlined"
              :label="i.title"
              color="teal-accent-4"
              class="align py-2 px-3"
              :rules="
                i.type === 'text'
                  ? i.required
                    ? rules.text
                    : undefined
                  : i.required
                  ? rules.Num
                  : undefined
              "
              v-model="i.value"
              required
            >
              <template v-slot:error>
                <p class="text-teal-accent-4"></p>
              </template>
              <template v-slot:append>
                <span class="text-error" v-if="i.required">*</span>
                <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1">{{ i.icon }} </v-icon>
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
              v-model="selection"
              v-if="i.type === 'chips'"
              selected-class="text-teal-accent-4"
              mandatory
            >
              <v-col cols="9" style="padding: 0px" class="d-flex justify-center">
                <v-chip
                  >فوق<br />
                  لیسانس</v-chip
                >
                <v-chip>لیسانس</v-chip>

                <v-chip
                  >فوق<br />
                  دیپلم</v-chip
                >
                <v-chip>دیپلم</v-chip>
                <v-chip>سیکل</v-chip>
              </v-col>
              <v-col cols="3" style="padding: 0px" class="d-flex align-center justify-end">
                <h6 class="text-right">{{ i.title }}</h6>
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
      </pageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import installmentPurchase from "~/assets/img/pics/installment-purchase.png";
import cashPurchase from "~/assets/img/pics/cash-purchase.png";
import formInputs from "~/components/employmentForms/personalInfo/formInput";
import cityJson from "~/components/employmentForms/personalInfo/city.json";
import pageBaseLayout from "~/components/pageBaseLayout.vue";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
export default {
  components: { Vue3PersianDatetimePicker, pageBaseLayout },
  setup() {
    const router = useRouter();
    const inputFields = ref(formInputs);
    const cities = ref(cityJson);
    const date = ref("");
    const states = ref(Object.keys(cities.value));
    const getCitiesByStates = (states) => {
      return states ? cities.value[states] : [];
    };
    // Extract keys and store them in an array
    const selectedState = ref(null);
    const selectedCity = ref(null);
    watch(selectedState, (newState) => {
      // When the selected region changes, update the items of the second autocomplete
      selectedCity.value = null;
      // Reset the selected city
    });
    const userIdentify = ref({
      name: "",
      fatherName: "",
      birthDate: "",
      birthPlace: "",
      nationalNo: null,
      serialNo: "",
      state: "",
      city: "",
      parish: "",
      street: "",
      alley: "",
      bloc: "",
      unit: "",
      phoneNo: "",
      homeNo: "",
    });
    const rules = ref({
      text: [
        (value) => {
          if (value) return true;
          return "لطفا فیلد اجباری را پر کنید";
        },
      ],
      Num: [
        (value) => {
          if (/[0-9-]+/.test(value)) return true;
          return "(اعداد انگیسی وارد کنید)لطفا فیلد اجباری را پر کنید";
        },
      ],
      stateSelect: [
        () => {
          if (selectedState.value) return true;
          return "لطفا استان خود را انتخاب کنید";
        },
      ],
      citySelect: [
        () => {
          if (selectedCity.value) return true;
          return "لطفا شهر خود را انتخاب کنید";
        },
      ],
    });
    const selection = ref();
    const submit = async (valid) => {
      if (valid) {
        router.push("/employment/personal-records");
      }
    };
    const routBackHandler = () => {
      router.back();
    };
    onMounted(() => {
      selection.value = 4;
    });
    return {
      inputFields,
      selection,
      userIdentify,
      submit,
      rules,
      states,
      getCitiesByStates,
      selectedState,
      selectedCity,
      date,
      routBackHandler,
      installmentPurchase,
      cashPurchase,
    };
  },
};
</script>
<style>
.v-toolbar__content {
  justify-content: center !important;
}
</style>
