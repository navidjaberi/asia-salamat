<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="سوابق شخصی"
        formClass="personal-records"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <v-row class="persnoal-records" no-gutters>
          <v-col xxl="5" xl="6" lg="7" md="8" cols="12" class="pa-0 mx-auto">
            <v-row v-for="i in recordInfo" :key="i.id">
              <v-col cols="3">
                <v-select
                  :items="['بله', 'خیر']"
                  variant="underlined"
                  color="teal-accent-4"
                  class="align mb-2"
                  :model-value="formData[i.id]"
                  @update:model-value="updateFormData(i.id, $event)"
                ></v-select>
              </v-col>
              <v-col cols="9" class="d-flex align-center justify-end text-right">
                <p style="font-weight: bold; font-size: 0.8rem">{{ i.title }}</p>
              </v-col>
              <v-divider></v-divider>
            </v-row>
          </v-col>
        </v-row>
      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import formInputs from "./formInputs";
import { useNurseInfoStore } from "~/store/nurseInfo";
export default {
  setup() {
    const recordInfo = ref(formInputs);
    const router = useRouter();
    const store = useNurseInfoStore();
    const trueItemsArray = ref([]);
    const formData = ref({
      Drug: "خیر",
      Smoke: "خیر",
      Alcoholic: "خیر",
      Disability: "خیر",
      SpecialDisease: "خیر",
      Criminal: "خیر",
      Family: "خیر",
      SpecializedDegree: "خیر",
    });
    const updateValues=(formData, keysArray)=> {
  for (const key in formData) {
    if (keysArray.includes(key)) {
      formData[key] = "بله";
    }
  }
}
    const updateFormData = (name, value) => {
      formData.value = { ...formData.value, [name]: value };
    };
    const storeTrueItems = (obj) => {
      const keysWithValueTrue = [];
      for (const key in obj) {
        if (obj[key] === "بله") {
          keysWithValueTrue.push(key);
        }
      }
      return keysWithValueTrue;
    };

    const submit = () => {
      trueItemsArray.value = storeTrueItems(formData.value);
      localStorage.setItem("personalRecords", JSON.stringify(trueItemsArray.value));
      store.info.otherProps = trueItemsArray.value;
      router.push("/employment/collaboration-terms");
    };
    const routBackHandler = () => {
      router.push("/employment/personal-info");
    };
    onMounted(() => {
      if (localStorage.getItem("personalRecords")) {
        trueItemsArray.value = JSON.parse(localStorage.getItem("personalRecords"));
        updateValues(formData.value,trueItemsArray.value)
      
      }
    });
    return { recordInfo, submit, routBackHandler, updateFormData, formData };
  },
};
</script>
