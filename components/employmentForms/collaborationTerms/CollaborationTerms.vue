<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="شرایط همکاری"
        formClass="collaboration"
        :bottomBtn="true"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <v-row no-gutters>
          <v-col xxl="5" xl="6" lg="7" md="8" cols="12" class="pa-0 mx-auto">
            <v-row>
              <v-col>
                <p class="text-right text-title font-weight-bold">
                  :لطفا گزینه مورد نظر را در خصوص مراقبت انتخاب بفرمایید
                </p></v-col
              >
              <v-col cols="12" class="d-flex justify-center pa-0">
                <v-checkbox
                  v-model="collaboration.nurseCategories"
                  label="پرستار سالمند"
                  color="teal-accent-4"
                  value="Oldage"
                  hide-details
                  @change="updateSelectAllCare"
                ></v-checkbox>
                <v-checkbox
                  v-model="collaboration.nurseCategories"
                  label="پرستار کودک"
                  color="teal-accent-4"
                  value="Kid"
                  hide-details
                  @change="updateSelectAllCare"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" class="d-flex justify-center pa-0">
                <v-checkbox
                  v-model="nurseCategoriesAll"
                  label="همه موارد"
                  color="teal-accent-4"
                  @click="selectAllCare"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="collaboration.nurseCategories"
                  label="پرستار بیمار"
                  color="teal-accent-4"
                  value="Patient"
                  hide-details
                  @change="updateSelectAllCare"
                ></v-checkbox>
              </v-col>
              <p class="error" v-if="error.category">حداقل یک گزینه را انتخاب کنید</p>
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p class="text-right text-title font-weight-bold">
                  آیا کودک،سالمند و یا بیمار از پوشک و یا لگن استفاده کند،شما میتوانید انجام دهید؟
                </p></v-col
              >
              <v-col cols="9" class="d-flex justify-center mx-auto pa-0">
                <v-radio-group v-model="collaboration.specialCare" inline>
                  <v-radio label="بله" color="teal-accent-4" :value="true" hide-details></v-radio>
                  <v-radio label="خیر" color="teal-accent-4" :value="false" hide-details></v-radio>
                </v-radio-group>
              </v-col>
              <p class="error" v-if="error.specialCare">یک گزینه را انتخاب کنید</p>
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p class="text-right text-title font-weight-bold">
                  میخواهید در کدام شیفیت کار کنید؟
                </p></v-col
              >
              <v-radio-group v-model="collaboration.shifts" inline>
                <v-col
                  cols="12"
                  lg="6"
                  xl="6"
                  xxl="6"
                  md="6"
                  class="d-flex justify-space-around mx-auto"
                >
                  <v-radio label="مقطعی" value="Hour" color="teal-accent-4" hide-details></v-radio>
                  <v-radio label="شبانه" value="Night" color="teal-accent-4" hide-details></v-radio>
                  <v-radio label="روزانه" value="Day" color="teal-accent-4" hide-details></v-radio>
                </v-col>
                <v-col
                  cols="12"
                  lg="6"
                  xl="6"
                  xxl="6"
                  md="6"
                  class="d-flex justify-space-around mx-auto pa-0"
                >
                  <v-radio label="همه موارد" color="teal-accent-4" hide-details></v-radio>
                  <v-radio
                    label="شبانه روزی"
                    value="Boarding"
                    color="teal-accent-4"
                    hide-details
                  ></v-radio>
                </v-col>
              </v-radio-group>
              <p class="error" v-if="error.shift">یک گزینه را انتخاب کنید</p>
            </v-row>
          </v-col>
        </v-row>
      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import { useNurseInfoStore } from "~/store/nurseInfo";
export default {
  setup() {
    const router = useRouter();
    const store = useNurseInfoStore();
    const form = ref(null);
    const nurseCategoriesAll = ref(false);
    const postError=ref(false)
    const loading=ref(false)
    const collaboration = ref({
      nurseCategories: [],
      specialCare: null,
      shifts: [],
    });
    const error = ref({
      category: false,
      specialCare: false,
      shift: false,
    });

    const selectAllCare = () => {
      nurseCategoriesAll.value = !nurseCategoriesAll.value;
      collaboration.value.nurseCategories = [];
      if (nurseCategoriesAll.value) {
        collaboration.value.nurseCategories = ["Kid", "Oldage", "Patient"];
      }
    };
    const updateSelectAllCare = () => {
      if (collaboration.value.nurseCategories.length === 3) {
        nurseCategoriesAll.value = true;
      } else {
        nurseCategoriesAll.value = false;
      }
    };

    const submit = async () => {
      error.value = {
        category: false,
        specialCare: false,
        shift: false,
      };
      if (collaboration.value.nurseCategories.length <= 0) {
        error.value.category = true;
      }
      if (collaboration.value.specialCare == null) {
        error.value.specialCare = true;
      }
      if (collaboration.value.shifts === "") {
        error.value.shift = true;
      }
      if (error.value.specialCare || error.value.specialCare || error.value.category) {
        return;
      } else {
        localStorage.setItem("collaborationTerms", JSON.stringify(collaboration.value));
        store.info = {... store.info, ...collaboration.value }
        router.push("/employment/upload-image");
        store.postNurseInfo(postError,loading)
      }
    };
    const routBackHandler = () => {
      router.push("/employment/personal-records");
    };
    onMounted(() => {
      if (localStorage.getItem("collaborationTerms")) {
        collaboration.value = JSON.parse(localStorage.getItem("collaborationTerms"));
        if (collaboration.value.nurseCategories.length === 3) {
          nurseCategoriesAll.value = true;
        }
      }
    });
    return {
      form,
      submit,
      routBackHandler,
      collaboration,
      selectAllCare,
      updateSelectAllCare,
      nurseCategoriesAll,
      error,
    };
  },
};
</script>
