<template>
  <div>
    <VApp>
      <pageBaseLayout
        :title="title"
        formClass="nurse-service"
        :firstIndex="true"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-text-field
                variant="underlined"
                color="teal-accent-4"
                type="number"
                :rules="rules.text"
                step="1"
                min="0"
            /></v-col>
            <v-col cols="8" class="d-flex align-center justify-end text-right px-5">
              <p class="text">{{ countTitle }}</p>
            </v-col>
            <v-divider :thickness="1" class="border-opacity-100" color="teal-accent-4"></v-divider>
          </v-row>
          <v-row>
            <v-col cols="8" style="display: flex; flex-wrap: nowrap">
              <v-checkbox
                label="هردو"
                color="teal-accent-4"
                hide-details
                inline
                style="width: 105px"
                v-model="genderAll"
                @click="selectAllGender"
              ></v-checkbox>
              <v-checkbox
                :label="mode === 'child' ? 'دختر' : 'خانم'"
                color="teal-accent-4"
                value="girl"
                hide-details
                inline
                style="width: 105px"
                v-model="gender"
                @change="genderUpdate"
              ></v-checkbox>
              <v-checkbox
                :label="mode === 'child' ? 'پسر' : 'آقا'"
                color="teal-accent-4"
                value="boy"
                hide-details
                inline
                style="width: 105px"
                v-model="gender"
                @change="genderUpdate"
              ></v-checkbox>
            </v-col>

            <v-col cols="4" class="d-flex align-center justify-end text-right px-5">
              <p class="text">جنسیت</p>
            </v-col>
            <v-divider :thickness="1" class="border-opacity-100" color="teal-accent-4"></v-divider>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field variant="underlined" color="teal-accent-4" type="text" :rules="rules.text"
            /></v-col>
            <v-col cols="8" class="d-flex align-center justify-end text-right px-5">
              <p class="text">{{ ageTitle }}</p>
            </v-col>
            <v-divider :thickness="1" class="border-opacity-100" color="teal-accent-4"></v-divider>
          </v-row>
          <v-row v-if="mode === 'elder'">
            <v-col cols="12" class="text-right"
              ><p class="text">سالمند شما کدام یک از موارد زیر را دارا میباشد؟</p></v-col
            >
            <v-col cols="12" class="d-flex flex-wrap justify-center elder-checkbox">
              <v-checkbox
                label="پوشک"
                color="teal-accent-4"
                value="diaper"
                hide-details
                inline
                v-model="elderCare"
                @change="elderCareUpdate"
              ></v-checkbox>
              <v-checkbox
                label="لگن"
                color="teal-accent-4"
                value="basin"
                hide-details
                inline
                v-model="elderCare"
                @change="elderCareUpdate"
              ></v-checkbox>
              <v-checkbox
                label="سون"
                color="teal-accent-4"
                value="son"
                hide-details
                inline
                v-model="elderCare"
                @change="elderCareUpdate"
              ></v-checkbox>
              <v-checkbox
                label="آلزایمر"
                color="teal-accent-4"
                value="alzaymer"
                hide-details
                inline
                v-model="elderCare"
                @change="elderCareUpdate"
              ></v-checkbox>
              <v-checkbox
                label="هیچکدام"
                color="teal-accent-4"
                hide-details
                inline
                v-model="elderCareNone"
                @click="elderCareSelectNone"
              ></v-checkbox>
              <v-checkbox
                label="پارکینسون"
                color="teal-accent-4"
                value="parkingson"
                hide-details
                inline
                v-model="elderCare"
                @change="elderCareUpdate"
              ></v-checkbox>
              <v-checkbox
                label="ام اس"
                color="teal-accent-4"
                value="MS"
                hide-details
                inline
                v-model="elderCare"
                @change="elderCareUpdate"
              ></v-checkbox>
            </v-col>
            <v-divider :thickness="1" class="border-opacity-100" color="teal-accent-4"></v-divider>
          </v-row>
          <v-row>
            <v-col cols="8" style="display: flex; flex-wrap: wrap">
              <v-checkbox
                label="شبانه"
                color="teal-accent-4"
                value="night"
                hide-details
                inline
                style="width: 100px"
                v-model="shifts"
              ></v-checkbox>
              <v-checkbox
                label="روزانه"
                color="teal-accent-4"
                value="day"
                hide-details
                inline
                style="width: 100px"
                v-model="shifts" 
              ></v-checkbox>
              <v-checkbox
                label="شبانه روزی"
                color="teal-accent-4"
                value="fullDay"
                hide-details
                inline
                style="width: 100px"
                v-model="shifts"
              ></v-checkbox>
              <v-checkbox
                label="مقطعی"
                color="teal-accent-4"
                value="partTime"
                hide-details
                inline
                style="width: 100px"
                v-model="shifts"
              ></v-checkbox>
            </v-col>

            <v-col cols="4" class="d-flex align-center justify-end text-right px-5">
              <p class="text">شیفت کاری</p>
            </v-col>

            <v-col class="d-flex flex-row-reverse align-center" v-if="!hideShiftHours">
              <v-col cols="4" class="text-right"> <p class="text">ساعت کاری از</p></v-col>
              <v-col cols="4">
                <v-text-field variant="underlined" color="teal-accent-4" :rules="rules.text"
              /></v-col>
              <span class="text">تا</span>
              <v-col cols="4">
                <v-text-field variant="underlined" color="teal-accent-4" :rules="rules.text"
              /></v-col>
            </v-col>
            <v-divider :thickness="1" class="border-opacity-100" color="teal-accent-4"></v-divider>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-select
                :items="['بله', 'خیر']"
                variant="underlined"
                color="teal-accent-4"
                v-model="beHome"
              ></v-select>
            </v-col>
            <v-col cols="9" class="d-flex align-center justify-end text-right px-5">
              <p class="text">در طول مدت فعالیت نیروی اعزامی چه شخصی داخل منزل حضور دارد؟</p>
            </v-col>
            <v-divider :thickness="1" class="border-opacity-100" color="teal-accent-4"></v-divider>
          </v-row>
          <v-row class="personal-info mt-3">
            <v-col cols="12">
              <p class="text-center text">محدوده محل سکونت</p>
              <v-autocomplete
                label="استان"
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
                  <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1"> mdi-city </v-icon>
                </template></v-autocomplete
              >
              <v-autocomplete
                label="شهر"
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
                  <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1"> mdi-city </v-icon>
                </template></v-autocomplete
              >
              <v-text-field
                variant="underlined"
                label="محله"
                color="teal-accent-4"
                :rules="rules.text"
                class="py-2 px-3"
              >
                <template v-slot:error>
                  <p class="text-teal-accent-4"></p>
                </template>
                <template v-slot:append>
                  <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1"
                    >mdi-home-group
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-divider
              :thickness="1"
              class="border-opacity-100 mb-4"
              color="teal-accent-4"
            ></v-divider>
          </v-row>

          <v-row class="personal-info">
            <v-textarea label="توضیحات" color="teal-accent-4" variant="solo"></v-textarea>
          </v-row>
        </v-container>
      </pageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import pageBaseLayout from "~/components/pageBaseLayout.vue";
import cityJson from "../employmentForms/personalInfo/city.json";
export default {
  components: { pageBaseLayout },
  props: {
    mode: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    countTitle: {
      type: String,
      required: true,
    },
    ageTitle: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const routes = useRoute();
    const form = ref(null);
    const cities = ref(cityJson);
    const elderCare = ref([]);
    const elderCareNone = ref(true);
    const shifts = ref(["day"]);
    const gender = ref(["boy"]);
    const beHome = ref("خیر");
    const genderAll = ref(false);
    const shiftsError = ref(true);
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
    const rules = ref({
      text: [
        (value) => {
          if (value) return true;
          return "لطفا فیلد اجباری را پر کنید";
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
    const elderCareSelectNone = () => {
      elderCareNone.value = !elderCareNone.value;
      elderCare.value = [];
      if (elderCareNone.value) {
        elderCare.value = [];
      }
    };

    const elderCareUpdate = () => {
      if (elderCare.value === []) {
        elderCareNone.value = true;
      } else {
        elderCareNone.value = false;
      }
    };

    const selectAllGender = () => {
      genderAll.value = !genderAll.value;
      gender.value = [];
      if (genderAll.value) {
        gender.value = ["boy", "girl"];
      }
    };
    const genderUpdate = () => {
      if (gender.value.length === 2) {
        genderAll.value = true;
      } else {
        genderAll.value = false;
      }
    };
    const hideShiftHours = computed(() => {
      if (shifts.value.includes("fullDay")) {
        return true;
      } else {
        return false;
      }
    });

    const submit = async (valid) => {
      if (valid) {
        router.push(`${routes.fullPath}/info`);
      }
    };
    const routBackHandler = () => {
      router.push("/nurse-services");
    };
    return {
      submit,
      form,
      routBackHandler,
      shifts,
      gender,
      getCitiesByStates,
      selectedState,
      selectedCity,
      states,
      rules,
      beHome,
      elderCare,
      elderCareNone,
      elderCareSelectNone,
      elderCareUpdate,
      genderUpdate,
      selectAllGender,
      genderAll,
      hideShiftHours,
      shiftsError,
    };
  },
};
</script>
