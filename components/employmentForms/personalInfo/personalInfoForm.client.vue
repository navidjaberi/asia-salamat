<template>
  <div>
    <VApp>
      <v-app-bar color="grey-lighten-5" elevation="1">
        <v-app-bar-nav-icon variant="text" style="position: absolute"
          ><NuxtLink to="/home"><v-icon>mdi-arrow-left</v-icon></NuxtLink></v-app-bar-nav-icon
        >
        <v-col> <p class="text-center font-weight-bold">اطلاعات شخصی</p></v-col>
      </v-app-bar>
      <v-main>
        <v-form class="px-4 mt-6 personal-info" @submit.prevent="sumbitForm">
          <v-row>
            <v-col cols="12" v-for="(i, index) in inputFields" :key="i" style="padding: 0px">
              <v-text-field
                v-if="i.type === 'text'"
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
          <v-row>
            <v-col> </v-col>
            <v-col>
              <v-btn append-icon="mdi-arrow-right" class="bg-teal-lighten-5" type="submit">
                مرحله بعد

                <template v-slot:append>
                  <v-icon color="teal-accent-4"></v-icon>
                </template>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-main>
    </VApp>
  </div>
</template>

<script>
import formInputs from "./formInput.ts";
import cityJson from "./city.json";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";

export default {
  components: { Vue3PersianDatetimePicker },
  setup() {
    const router = useRouter();
    const inputFields = ref(formInputs);
    const cities = ref(cityJson);
    const date = ref("");
    const states = ref(Object.keys(cities.value));
    const getCitiesByStates = (states) => {
      console.log(cities.value[states]);
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
    const sumbitForm = () => {};
    onMounted(() => {
      selection.value = 4;
    });
    return {
      inputFields,
      selection,
      userIdentify,
      sumbitForm,
      rules,
      states,
      getCitiesByStates,
      selectedState,
      selectedCity,
      date,
    };
  },
};
</script>
<style lang="scss">
.vpd-icon-btn,
.pdp-group {
  display: none !important;
}
.vpd-input-group {
  width: 100%;
}
.personal-info {
  .form-control {
    border: none;
    border-bottom: 1px solid rgb(133, 133, 133);
    color: rgb(95, 95, 95);
    font-size: 0.8rem;
    font-weight: bold;
  }
  .date-picker {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 18px;
    padding-top: 10px;
    padding-left: 0px;
  }
  .date-picker--div {
    width: 100%;
    max-width: 100%;
    margin-right: 8px;
  }
  .v-field-label,
  .v-label,
  .v-field-label--floating,
  .v-field-label {
    font-weight: bold !important;
    right: 10px !important;
    font-size: 0.8rem !important;
  }
  input {
    text-align: right !important;
  }
  .v-field-label--floating {
    right: 10px !important;
    font-size: 0.6rem !important;
  }
  .v-chip {
    border-radius: 5px !important;
    font-size: 0.6rem !important;
    text-align: center !important;
    height: 40px !important;
    padding: 0px 8px !important;
  }
  .v-messages__message {
    text-align: right !important;
    font-size: 0.7rem !important;
  }
  .v-auto-complete--menu-active {
    text-align: right !important;
  }
  .v-field__input {
    text-align: right !important;
    display: flex;
    justify-content: flex-end;
    font-size: 0.8rem;
  }

  .v-counter {
    display: none;
  }
}
</style>
