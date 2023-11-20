<template>
  <div>
    <VApp>
      <v-app-bar color="grey-lighten-5" elevation="1">
        <v-app-bar-nav-icon variant="text" style="position: absolute"
          ><NuxtLink to="/employment/personal-info"
            ><v-icon>mdi-arrow-left</v-icon></NuxtLink
          ></v-app-bar-nav-icon
        >
        <v-col> <p class="text-center font-weight-bold">شرایط همکاری</p></v-col>
      </v-app-bar>
      <v-main>
        <v-form class="px-4 mt-6 collabration" @submit.prevent="submit" validate-on="submit">
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
            <p class="error" v-if="careError">لطفا حداقل یک گزینه را انتخاب کنید</p>
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
            <p class="error" v-if="diaperError">لطفا یک گزینه را انتخاب کنید</p>
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
            <p class="error" v-if="shiftError">لطفا حداقل یک گزینه را انتخاب کنید</p>
          </v-row>
          <v-row class="mt-7" style="position: absolute; bottom: 1rem; width: 100%">
            <v-col>
              <v-btn
                prepend-icon="mdi-arrow-left"
                class="bg-teal-lighten-5"
                block
                @click="routBackHandler"
              >
                مرحله قبل

                <template v-slot:prepend>
                  <v-icon color="teal-accent-4"></v-icon>
                </template>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn append-icon="mdi-arrow-right" class="bg-teal-lighten-5" type="submit" block>
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
export default {
  setup() {
    const router = useRouter();
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
      router.back();
    };
    return {
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
<style lang="scss">
.collabration {
  .v-selection-control {
    display: flex;
    justify-content: center;
  }
  .v-label {
    display: flex;
    justify-content: flex-end;
    font-size: 0.8rem !important;
  }
  .v-selection-control-group {
    justify-content: space-around;
  }
}
.error {
  color: red;
  margin: 5px auto;
  font-size: 0.8rem;
}
</style>
