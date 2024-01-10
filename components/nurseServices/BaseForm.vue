<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        :title="title"
        formClass="nurse-service"
        :firstIndex="true"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <v-row no-gutters class="px-3">
          <v-col xxl="5" xl="6" lg="7" md="8" cols="12" class="mx-auto">
            <v-row>
              <v-col cols="4">
                <v-select
                  :items="['1', '2', '3', '4']"
                  variant="underlined"
                  color="teal-accent-4"
                  v-model="formData.count"
                ></v-select
              ></v-col>
              <v-col cols="8" class="d-flex align-center justify-end text-right px-5">
                <p class="text">{{ countTitle }}</p>
              </v-col>
              <v-divider
                :thickness="1"
                class="border-opacity-100"
                color="teal-accent-4"
              ></v-divider>
            </v-row>
            <v-row>
              <v-col cols="8">
                <v-radio-group v-model="formData.gender" class="d-flex" inline>
                  <v-radio
                    label="هردو"
                    color="teal-accent-4"
                    value="partTime"
                    hide-details
                  ></v-radio>
                  <v-radio
                    :label="mode === 'child' ? 'دختر' : 'خانم'"
                    color="teal-accent-4"
                    value="girl"
                    hide-details
                  ></v-radio>
                  <v-radio
                    :label="mode === 'child' ? 'پسر' : 'آقا'"
                    color="teal-accent-4"
                    value="boy"
                    hide-details
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="4" class="d-flex align-center justify-end text-right px-5">
                <p class="text">جنسیت</p>
              </v-col>
              <v-divider
                :thickness="1"
                class="border-opacity-100"
                color="teal-accent-4"
              ></v-divider>
            </v-row>
            <v-row v-for="(field, index) in generatedTextFields" :key="index">
              <v-col cols="4">
                <v-text-field
                  v-if="field.show"
                  variant="underlined"
                  color="teal-accent-4"
                  type="text"
                  :rules="rules.num"
                  :model-value="ageObj[field.id]"
                  @update:model-value="updateAgeData(field.id, $event)"
              /></v-col>
              <v-col cols="8" class="d-flex align-center justify-end text-right px-5">
                <p class="text">
                  <span v-if="index > 0">{{ index + 1 }}</span> {{ ageTitle }}
                </p>
              </v-col>
              <v-divider
                :thickness="1"
                class="border-opacity-100"
                color="teal-accent-4"
              ></v-divider>
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
                  v-model="formData.problems"
                  @change="elderCareUpdate"
                ></v-checkbox>
                <v-checkbox
                  label="لگن"
                  color="teal-accent-4"
                  value="basin"
                  hide-details
                  inline
                  v-model="formData.problems"
                  @change="elderCareUpdate"
                ></v-checkbox>
                <v-checkbox
                  label="سون"
                  color="teal-accent-4"
                  value="son"
                  hide-details
                  inline
                  v-model="formData.problems"
                  @change="elderCareUpdate"
                ></v-checkbox>
                <v-checkbox
                  label="آلزایمر"
                  color="teal-accent-4"
                  value="alzaymer"
                  hide-details
                  inline
                  v-model="formData.problems"
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
                  v-model="formData.problems"
                  @change="elderCareUpdate"
                ></v-checkbox>
                <v-checkbox
                  label="ام اس"
                  color="teal-accent-4"
                  value="MS"
                  hide-details
                  inline
                  v-model="formData.problems"
                  @change="elderCareUpdate"
                ></v-checkbox>
              </v-col>
              <v-divider
                :thickness="1"
                class="border-opacity-100"
                color="teal-accent-4"
              ></v-divider>
            </v-row>
            <v-row>
              <v-col cols="9">
                <v-radio-group v-model="formData.shifts" class="d-flex" inline>
                  <v-radio
                    label="شبانه"
                    color="teal-accent-4"
                    value="night"
                    hide-details
                    class="w-50"
                  ></v-radio>
                  <v-radio
                    label="روزانه"
                    color="teal-accent-4"
                    value="day"
                    hide-details
                    class="w-50"
                  ></v-radio>
                  <v-radio
                    label="شبانه روزی"
                    color="teal-accent-4"
                    value="fullDay"
                    hide-details
                    class="w-50"
                  ></v-radio>
                  <v-radio
                    label="مقطعی"
                    color="teal-accent-4"
                    value="partTime"
                    hide-details
                    class="w-50"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="3" class="d-flex align-center justify-end text-right px-5">
                <p class="text">شیفت کاری</p>
              </v-col>
              <v-col class="d-flex flex-row-reverse align-center" v-if="!hideShiftHours">
                <v-col cols="4" class="text-right"> <p class="text">ساعت کاری از</p></v-col>
                <v-col cols="4">
                  <v-text-field
                    variant="underlined"
                    color="teal-accent-4"
                    v-model="formData.shiftStart"
                    :rules="rules.text"
                /></v-col>
                <span class="text">تا</span>
                <v-col cols="4">
                  <v-text-field
                    variant="underlined"
                    color="teal-accent-4"
                    v-model="formData.shiftEnd"
                    :rules="rules.text"
                /></v-col>
              </v-col>
              <v-divider
                :thickness="1"
                class="border-opacity-100"
                color="teal-accent-4"
              ></v-divider>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  variant="underlined"
                  color="teal-accent-4"
                  type="text"
                  :rules="rules.text"
                  v-model="formData.peopleInHouse"
                />
              </v-col>
              <v-col cols="9" class="d-flex align-center justify-end text-right px-5">
                <p class="text">در طول مدت فعالیت نیروی اعزامی چه شخصی داخل منزل حضور دارد؟</p>
              </v-col>
              <v-divider
                :thickness="1"
                class="border-opacity-100"
                color="teal-accent-4"
              ></v-divider>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-select
                  :items="['بله', 'خیر']"
                  variant="underlined"
                  color="teal-accent-4"
                  v-model="formData.camera"
                ></v-select>
              </v-col>
              <v-col cols="9" class="d-flex align-center justify-end text-right px-5">
                <p class="text">آیا در محل نیروی اعزامی دوربین مداربسته وجود دارد؟</p>
              </v-col>
              <v-divider
                :thickness="1"
                class="border-opacity-100"
                color="teal-accent-4"
              ></v-divider>
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
                  v-model="formData.state"
                  :counter="false"
                >
                  <template v-slot:append>
                    <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1">
                      mdi-city
                    </v-icon>
                  </template></v-autocomplete
                >
                <v-autocomplete
                  label="شهر"
                  :items="getCitiesByStates(formData.state)"
                  variant="underlined"
                  color="teal-accent-4"
                  class="align px-3"
                  :rules="rules.citySelect"
                  menu-icon=""
                  v-model="formData.city"
                  :counter="false"
                >
                  <template v-slot:append>
                    <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1">
                      mdi-city
                    </v-icon>
                  </template></v-autocomplete
                >
                <v-text-field
                  variant="underlined"
                  label="محله"
                  color="teal-accent-4"
                  :rules="rules.text"
                  class="py-2 px-3"
                  v-model="formData.neighborhood"
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
              <v-textarea
                label="توضیحات"
                color="teal-accent-4"
                variant="solo"
                v-model="formData.description"
              ></v-textarea>
            </v-row>
          </v-col>
        </v-row>
      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import cityJson from "../EmploymentForms/PersonalInfo/city.json";
export default {
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
  setup(props) {
    const router = useRouter();
    const routes = useRoute();
    const form = ref(null);
    const cities = ref(cityJson);
    const elderCareNone = ref(null);
    const ageObj = ref({});
    const shiftsError = ref(true);
    const formData = ref({
      count: "1",
      gender: "boy",
      age: [],
      shifts: "day",
      peopleInHouse: "",
      camera: "خیر",
      state: null,
      city: null,
      neighborhood: "",
      description: "",
      shiftStart: "",
      shiftEnd: "",
      problems: [],
    });
    const states = ref(Object.keys(cities.value));
    const getCitiesByStates = (states) => {
      return states ? cities.value[states] : [];
    };
    const updateAgeData = (name, value) => {
      ageObj.value = { ...ageObj.value, [name]: value };
      const AgeResultObject = Object.keys(ageObj.value).reduce((accumulator, key) => {
        accumulator[key] = useToEnglishDigits(ageObj.value[key]);
       
        return accumulator;
      }, {});
      formData.value.age = Object.values(AgeResultObject).map((value) => parseInt(value, 10));
    };
    const cctv = computed(() => {
      if (formData.value.camera === "خیر") return false;
      else {
        return true;
      }
    });
    const generatedTextFields = computed(() => {
      const numFields = parseInt(formData.value.count);
      return Array.from({ length: numFields }, (_, index) => ({ id: index + 1, show: true }));
    });
    const localKey = computed(() => {
      if (props.mode === "child") {
        return "nurseReserveChild";
      } else if (props.mode === "elder") {
        return "nurseReserveElder";
      } else if (props.mode === "sick") {
        return "nurseReserveSick";
      }
    });
    watch(formData, (newState) => {
      if (!localStorage.getItem(localKey.value)) {
        formData.value.city = null;
        elderCareNone.value = true;
      }
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
          if (/^[0-9-]+$/.test(value) || /^[۰-۹-]+$/.test(value)) return true;
          return "سن را به درستی وارد کنید";
        },
      ],
      stateSelect: [
        () => {
          if (formData.value.state) return true;
          return "لطفا استان خود را انتخاب کنید";
        },
      ],
      citySelect: [
        () => {
          if (formData.value.city) return true;
          return "لطفا شهر خود را انتخاب کنید";
        },
      ],
    });
    const elderCareSelectNone = () => {
      elderCareNone.value = !elderCareNone.value;
      formData.value.problems = [];
      if (elderCareNone.value) {
        formData.value.problems = [];
      }
    };
    const elderCareUpdate = () => {
      if (formData.value.problems === []) {
        elderCareNone.value = true;
      } else {
        elderCareNone.value = false;
      }
    };
    const hideShiftHours = computed(() => {
      if (formData.value.shifts === "fullDay") {
        return true;
      } else {
        return false;
      }
    });
    const submit = async (valid) => {
      if (valid) {
        localStorage.setItem(localKey.value, JSON.stringify(formData.value));
        router.push(`${routes.fullPath}/info`);
      }
    };
    const routBackHandler = () => {
      router.push("/nurse-services");
    };
    onMounted(() => {
      if (localStorage.getItem(localKey.value)) {
        formData.value = JSON.parse(localStorage.getItem(localKey.value));
        const AgeResultObject = formData.value.age.reduce((accumulator, currentValue, index) => {
          accumulator[index + 1] = currentValue.toString();
          return accumulator;
        }, {});
        ageObj.value = AgeResultObject;
        if (props.mode === "elder") {
          if (formData.value.problems.length <= 0) {
            elderCareNone.value = true;
          }
        }
      } else {
        if (props.mode === "elder") {
          elderCareNone.value = true;
        }
      }
    });
    return {
      submit,
      form,
      routBackHandler,
      getCitiesByStates,
      states,
      rules,
      elderCareNone,
      elderCareSelectNone,
      elderCareUpdate,
      hideShiftHours,
      shiftsError,
      updateAgeData,
      ageObj,
      generatedTextFields,
      formData,
    };
  },
};
</script>
