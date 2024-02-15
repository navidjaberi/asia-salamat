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
                <p class="text-title">{{ countTitle }}</p>
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
                  <v-radio label="هردو" color="teal-accent-4" value="Both" hide-details></v-radio>
                  <v-radio
                    :label="mode === 'Kid' ? 'دختر' : 'خانم'"
                    color="teal-accent-4"
                    value="Female"
                    hide-details
                  ></v-radio>
                  <v-radio
                    :label="mode === 'Kid' ? 'پسر' : 'آقا'"
                    color="teal-accent-4"
                    value="Male"
                    hide-details
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="4" class="d-flex align-center justify-end text-right px-5">
                <p class="text-title">جنسیت</p>
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
                <p class="text-title">
                  <span v-if="index > 0">{{ index + 1 }}</span> {{ ageTitle }}
                </p>
              </v-col>
              <v-divider
                :thickness="1"
                class="border-opacity-100"
                color="teal-accent-4"
              ></v-divider>
            </v-row>
            <v-row v-if="mode === 'OldAge'">
              <v-col cols="12" class="text-right"
                ><p class="text-title">سالمند شما کدام یک از موارد زیر را دارا میباشد؟</p></v-col
              >
              <v-col cols="12" class="d-flex flex-wrap justify-center elder-checkbox">
                <v-checkbox
                  label="پوشک"
                  color="teal-accent-4"
                  value="Diaper"
                  hide-details
                  inline
                  v-model="formData.problems"
                  @change="elderCareUpdate"
                ></v-checkbox>
                <v-checkbox
                  label="لگن"
                  color="teal-accent-4"
                  value="Bedpan"
                  hide-details
                  inline
                  v-model="formData.problems"
                  @change="elderCareUpdate"
                ></v-checkbox>
                <v-checkbox
                  label="آلزایمر"
                  color="teal-accent-4"
                  value="Alzheimer"
                  hide-details
                  inline
                  v-model="formData.problems"
                  @change="elderCareUpdate"
                ></v-checkbox>
                <v-checkbox
                  label="پارکینسون"
                  color="teal-accent-4"
                  value="Parkinson"
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
                <v-radio-group v-model="formData.shift" class="d-flex" inline>
                  <v-radio
                    label="شبانه"
                    color="teal-accent-4"
                    value="Night"
                    hide-details
                    class="w-50"
                  ></v-radio>
                  <v-radio
                    label="روزانه"
                    color="teal-accent-4"
                    value="Day"
                    hide-details
                    class="w-50"
                  ></v-radio>
                  <v-radio
                    label="شبانه روزی"
                    color="teal-accent-4"
                    value="Boarding"
                    hide-details
                    class="w-50"
                  ></v-radio>
                  <v-radio
                    label="مقطعی"
                    color="teal-accent-4"
                    value="Hour"
                    hide-details
                    class="w-50"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="3" class="d-flex align-center justify-end text-right px-5">
                <p class="text-title">شیفت کاری</p>
              </v-col>
              <v-col class="d-flex flex-row-reverse align-center" v-if="!hideShiftHours">
                <v-col cols="4" class="text-right"> <p class="text-title">ساعت کاری از</p></v-col>
                <v-col cols="4" >
                  <v-text-field
                  placeholder="۹ صبح"
                    variant="underlined"
                    color="teal-accent-4"
                    v-model="formData.from"
                    :rules="rules.text"
                /></v-col>
                <span class="text">تا</span>
                <v-col cols="4">
                  <v-text-field
                  placeholder="۶ بعدازظهر"
                    variant="underlined"
                    color="teal-accent-4"
                    v-model="formData.to"
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
                <p class="text-title">در طول مدت فعالیت نیروی اعزامی چه شخصی داخل منزل حضور دارد؟</p>
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
                <p class="text-title">آیا در محل نیروی اعزامی دوربین مداربسته وجود دارد؟</p>
              </v-col>
              <v-divider
                :thickness="1"
                class="border-opacity-100"
                color="teal-accent-4"
              ></v-divider>
            </v-row>
            <v-row class="personal-info mt-3">
              <v-col cols="12">
                <p class="text-center text-title">محدوده محل سکونت</p>
                <v-autocomplete
                  label="استان"
                  :items="states"
                  variant="underlined"
                  color="teal-accent-4"
                  class="align px-3" 
                  :rules="rules.stateSelect"
                  menu-icon=""
                  v-model="formData.province"
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
                  :items="getCitiesByStates(formData.province)"
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
                    <p class="text-teal-accent-4 text-title"></p>
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
    const shiftError = ref(true);
    const formData = ref({
      count: "1",
      nurseCategory: props.mode,
      gender: "Male",
      ages: [],
      shift: "Day",
      peopleInHouse: "",
      camera: "خیر",
      province: null,
      city: null,
      neighborhood: "",
      description: "",
      from: "",
      to: "",
      problems: [],
    });
    //config for state and city selects which bring each state's cities
    const states = ref(Object.keys(cities.value));
    const getCitiesByStates = (states) => {
      return states ? cities.value[states] : [];
    };
    //get age data and make an array of ages depend of the amount of age's input
    const updateAgeData = (name, value) => {
      ageObj.value = { ...ageObj.value, [name]: value };
      const AgeResultObject = Object.keys(ageObj.value).reduce((accumulator, key) => {
        accumulator[key] = useToEnglishDigits(ageObj.value[key]);
        return accumulator;
      }, {});
      formData.value.ages = Object.values(AgeResultObject).map((value) => parseInt(value, 10));
    };
    //get the cctv inputs value and convert it to boolean type
    const cctv = computed(() => {
      if (formData.value.camera === "خیر") return false;
      else {
        return true;
      }
    });
    //generate form ages fields depend on the count of patient
    const generatedTextFields = computed(() => {
      const numFields = parseInt(formData.value.count);
      return Array.from({ length: numFields }, (_, index) => ({ id: index + 1, show: true }));
    });
    //get each mode localStorage key
    const localKey = computed(() => {
      if (props.mode === "Kid") {
        return "nurseReserveChild";
      } else if (props.mode === "OldAge") {
        return "nurseReserveElder";
      } else if (props.mode === "Patient") {
        return "nurseReserveSick";
      }
    });
    //check if each mode local storage not exist bring the form default values
    watch(formData, (newState) => {
      if (!localStorage.getItem(localKey.value)) {
        formData.value.city = null;
        elderCareNone.value = true;
      }
    });
    //inputs validations
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
          if (formData.value.province) return true;
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
    //handle the none select checkbox for un check all other checkboxes
    const elderCareSelectNone = () => {
      elderCareNone.value = !elderCareNone.value;
      formData.value.problems = [];
      if (elderCareNone.value) {
        formData.value.problems = [];
      }
    };
    //check if none of checkboxes were selected,check the none checkbox
    const elderCareUpdate = () => {
      if (formData.value.problems === []) {
        elderCareNone.value = true;
      } else {
        elderCareNone.value = false;
      }
    };
    //check if the boarding shift checkbox was selected hide the shift hour fields
    const hideShiftHours = computed(() => {
      if (formData.value.shift === "Boarding") {
        return true;
      } else {
        return false;
      }
    });
    //check if validations are satisfied store the form data in local storage and forward the form to the next step
    const submit = async (valid) => {
      formData.value.cctv = cctv.value;
      if (valid) {
        localStorage.setItem(localKey.value, JSON.stringify(formData.value));
        router.push(`${routes.fullPath}/info`);
      }
    };
    //form backward button
    const routBackHandler = () => {
      router.push("/nurse-services");
    };
    //check if any mode's local storage has item and fill the inputs
    const getItemFromLocalStorage = () => {
      if (localStorage.getItem(localKey.value)) {
        formData.value = JSON.parse(localStorage.getItem(localKey.value));
        const AgeResultObject = formData.value.ages.reduce((accumulator, currentValue, index) => {
          accumulator[index + 1] = currentValue.toString();
          return accumulator;
        }, {});
        ageObj.value = AgeResultObject;
        if (props.mode === "OldAge") {
          if (formData.value.problems.length <= 0) {
            elderCareNone.value = true;
          }
        }
      } else {
        if (props.mode === "OldAge") {
          elderCareNone.value = true;
        }
      }
    };
    onMounted(() => {
      getItemFromLocalStorage();
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
      shiftError,
      updateAgeData,
      ageObj,
      generatedTextFields,
      formData,
    };
  },
};
</script>
