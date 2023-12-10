<template>
  <div>
    <VApp>
      <pageBaseLayout
        title="شرایط همکاری"
        formClass="collaboration"
        :bottomBtn="true"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <v-row>
          <v-col cols="12">
            <p class="text-right" style="font-weight: bold; font-size: 0.8rem">
              :لطفا گزینه مورد نظر را در خصوص مراقبت انتخاب بفرمایید
            </p></v-col
          >
          <v-col cols="12" class="d-flex justify-center" style="padding: 0px">
            <v-checkbox
              v-model="careOptions"
              label="پرستار سالمند"
              color="teal-accent-4"
              value="elderyNurse"
              hide-details
              @change="updateSelectAllCare"
            ></v-checkbox>
            <v-checkbox
              v-model="careOptions"
              label="پرستار کودک"
              color="teal-accent-4"
              value="childNurse"
              hide-details
              @change="updateSelectAllCare"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" class="d-flex justify-center" style="padding: 0px; margin-top: -10px">
            <v-checkbox
              v-model="careSelectedAll"
              label="همه موارد"
              color="teal-accent-4"
              @click="selectAllCare"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="careOptions"
              label="پرستار بیمار"
              color="teal-accent-4"
              value="sickNurse"
              hide-details
              @change="updateSelectAllCare"
            ></v-checkbox>
          </v-col>
          <p class="error" v-if="careError"> حداقل یک گزینه را انتخاب کنید</p>
          <v-divider></v-divider>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p class="text-right" style="font-weight: bold; font-size: 0.8rem">
              آیا کودک،سالمند و یا بیمار از پوشک و یا لگن استفاده کند،شما میتوانید انجام دهید؟
            </p></v-col
          >
          <v-col cols="9" class="d-flex justify-center mx-auto" style="padding: 0px">
            <v-checkbox
              v-model="diaperChange"
              label="بله"
              color="teal-accent-4"
              value="yes"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="diaperChange"
              label="خیر"
              color="teal-accent-4"
              value="no"
              hide-details
            ></v-checkbox>
          </v-col>
          <p class="error" v-if="diaperError"> یک گزینه را انتخاب کنید</p>
          <v-divider></v-divider>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p class="text-right" style="font-weight: bold; font-size: 0.8rem">
              میخواهید در کدام شیفیت کار کنید؟
            </p></v-col
          >
          <v-col cols="12" class="d-flex justify-center mx-auto" style="padding: 0px">
            <v-checkbox
              v-model="workShift"
              label="مقطعی"
              value="partTimeWork"
              color="teal-accent-4"
              hide-details
              @change="updateSelectAllShift"
            ></v-checkbox>

            <v-checkbox
              v-model="workShift"
              label="شبانه"
              value="nightWork"
              color="teal-accent-4"
              hide-details
              @change="updateSelectAllShift"
            ></v-checkbox>
            <v-checkbox
              v-model="workShift"
              label="روزانه"
              value="dayWork"
              color="teal-accent-4"
              hide-details
              @change="updateSelectAllShift"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" class="d-flex justify-center mx-auto" style="padding: 0px">
            <v-checkbox
              v-model="shiftSelectedAll"
              label="همه موارد"
              color="teal-accent-4"
              @click="selectAllShift"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="workShift"
              label="شبانه روزی"
              value="dayAndNightWork"
              color="teal-accent-4"
              hide-details
              @change="updateSelectAllShift"
            ></v-checkbox>
          </v-col>
          <p class="error" v-if="shiftError"> حداقل یک گزینه را انتخاب کنید</p>
        </v-row>
       
      </pageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import pageBaseLayout from "~/components/pageBaseLayout.vue";
export default {
  components: { pageBaseLayout },
  setup() {
    const router = useRouter();
    const form = ref(null);
    const careOptions = ref([]);
    const careSelectedAll = ref(false);
    const workShift = ref([]);
    const shiftSelectedAll = ref(false);
    const diaperChange = ref([]);
    const careError = ref(false);
    const diaperError = ref(false);
    const shiftError = ref(false);
    const selectAllCare = () => {
      careSelectedAll.value = !careSelectedAll.value;
      careOptions.value = [];
      if (careSelectedAll.value) {
        careOptions.value = ["elderyNurse", "childNurse", "sickNurse"];
      }
    };
    const updateSelectAllCare = () => {
      if (careOptions.value.length === 3) {
        careSelectedAll.value = true;
      } else {
        careSelectedAll.value = false;
      }
    };
    watch(diaperChange, (newVal) => {
      if (newVal.length > 1) {
        diaperChange.value = [newVal[newVal.length - 1]]; // Keep only the last selected value
      }
    });
    const selectAllShift = () => {
      shiftSelectedAll.value = !shiftSelectedAll.value;
      workShift.value = [];
      if (shiftSelectedAll.value) {
        workShift.value = ["partTimeWork", "dayAndNightWork", "dayWork", "nightWork"];
      }
    };
    const updateSelectAllShift = () => {
      if (workShift.value.length === 4) {
        shiftSelectedAll.value = true;
      } else {
        shiftSelectedAll.value = false;
      }
    };
    const rules = (val, error) => {
      if (val.value.length === 0) {
        error.value = true;
        return true;
      } else {
        error.value = false;
        return false;
      }
    };

    const submit = async () => {
      if (
        rules(careOptions, careError) ||
        rules(diaperChange, diaperError) ||
        rules(workShift, shiftError)
      ) {
        return;
      } else {
        router.push("/employment/upload-image");
      }
    };
    const routBackHandler = () => {
      router.push("/employment/personal-records");
    };
    return {
      form,
      submit,
      routBackHandler,
      careOptions,
      selectAllCare,
      updateSelectAllCare,
      careSelectedAll,
      diaperChange,
      shiftSelectedAll,
      selectAllShift,
      workShift,
      updateSelectAllShift,
      rules,
      careError,
      diaperError,
      shiftError,
    };
  },
};
</script>
