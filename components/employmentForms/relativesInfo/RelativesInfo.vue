<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="اطلاعات دوستان و آشنایان"
        formClass="relatives"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <BaseLoadingAndError :loading="loading" :error="postError" :postData="true" class="mb-3" />
        <v-row no-gutters style="direction: rtl">
          <v-col xxl="5" xl="6" lg="7" md="8" cols="12" class="pa-0 mx-auto">
            <p class="text-right  text-title" >
              لطفا سه نفر را معرفی بفرمایید که شما را میشناسند:
            </p>
            <v-row>
              <v-col cols="12" v-for="(item, index) in inputFields" class="pa-0" :key="item.id"
                ><v-row no-gutters v-if="item.id === 'firstRelative'">
                  <v-col
                    v-for="(input, inputIndex) in item.inputs"
                    cols="6"
                    :key="inputIndex"
                    class="pa-0 pt-2"
                  >
                    <v-text-field
                      variant="underlined"
                      :label="input.title"
                      color="teal-accent-4"
                      class="align py-2 px-3"
                      :rules="
                        input.notRequired
                          ? undefined
                          : input.type === 'num'
                          ? rules.Num
                          : rules.text
                      "
                      :model-value="allRelativesInfo.firstRelative[input.id]"
                      @update:model-value="updateFormData(input.id, $event, item.id)"
                    >
                    </v-text-field>
                  </v-col>
                  <v-divider
                    :thickness="3"
                    class="border-opacity-100"
                    color="teal-accent-4"
                  ></v-divider>
                </v-row>
                <v-row no-gutters v-if="item.id === 'secondRelative'">
                  <v-col
                    v-for="(input, inputIndex) in item.inputs"
                    cols="6"
                    :key="inputIndex"
                    class="pa-0 pt-2"
                  >
                    <v-text-field
                      variant="underlined"
                      :label="input.title"
                      color="teal-accent-4"
                      class="align py-2 px-3"
                      :rules="
                        input.notRequired
                          ? undefined
                          : input.type === 'num'
                          ? rules.Num
                          : rules.text
                      "
                      :model-value="allRelativesInfo.secondRelative[input.id]"
                      @update:model-value="updateFormData(input.id, $event, item.id)"
                    >
                    </v-text-field>
                  </v-col>
                  <v-divider
                    :thickness="3"
                    class="border-opacity-100"
                    color="teal-accent-4"
                  ></v-divider>
                </v-row>
                <v-row no-gutters v-if="item.id === 'thirdRelative'">
                  <v-col
                    v-for="(input, inputIndex) in item.inputs"
                    cols="6"
                    :key="inputIndex"
                    class="pa-0 pt-2"
                  >
                    <v-text-field
                      variant="underlined"
                      :label="input.title"
                      color="teal-accent-4"
                      class="align py-2 px-3"
                      :rules="
                        input.notRequired
                          ? undefined
                          : input.type === 'num'
                          ? rules.Num
                          : rules.text
                      "
                      :model-value="allRelativesInfo.thirdRelative[input.id]"
                      @update:model-value="updateFormData(input.id, $event, item.id)"
                    >
                    </v-text-field>
                  </v-col>
                  <v-divider
                    :thickness="3"
                    class="border-opacity-100"
                    color="teal-accent-4"
                  ></v-divider>
                </v-row>
                <v-row no-gutters v-if="item.id === 'family'">
                  <v-col
                    v-for="(input, inputIndex) in item.inputs"
                    cols="12"
                    :key="inputIndex"
                    class="pa-0 pt-2"
                  >
                    <v-text-field
                      variant="underlined"
                      :label="input.title"
                      color="teal-accent-4"
                      class="align py-2 px-3"
                      :rules="
                        input.notRequired
                          ? undefined
                          : input.type === 'num'
                          ? rules.Num
                          : rules.text
                      "
                      :model-value="allInfo.nurseOtherInfo[input.id]"
                      @update:model-value="updateFormData(input.id, $event, item.id)"
                    >
                    </v-text-field>
                  </v-col>
                  <v-divider
                    :thickness="3"
                    class="border-opacity-100"
                    color="teal-accent-4"
                  ></v-divider>
                </v-row>
              </v-col>
              <v-col>
                <p class="text-right  text-title">
                  در صورت مشغول به کار شدن کدام یک از موارد را جهت ضمانت میتوانید نزد شرکت قرار
                  دهید؟
                </p>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-radio-group v-model="allInfo.Guarantee">
                  <v-radio
                    label="(به مبلغ ۵۰ میلیون تومان)سفته"
                    color="teal-accent-4"
                    value="promissory"
                    hide-details
                    class="checkbox"
                  ></v-radio>
                  <v-radio
                    label="(به ارزش ۱۰۰ میلیون تومان)چک"
                    color="teal-accent-4"
                    value="check"
                    class="checkbox"
                    hide-details
                  ></v-radio>
                  <v-radio
                    label="جواز کسب"
                    color="teal-accent-4"
                    value="BusinessLicense"
                    class="checkbox"
                    hide-details
                  ></v-radio>
                  <v-radio
                    value="Representative"
                    color="teal-accent-4"
                    label="(کارمند دولتی)معرف"
                    class="checkbox"
                    hide-details
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <p class="error" v-if="error">یک گزینه را انتخاب کنید</p>
            </v-row>
          </v-col>
        </v-row>
      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import formInputs from "./formInputs.ts";
export default  {
  setup() {
    const inputFields = ref(formInputs);
    const router = useRouter();
    const nurseId = ref(localStorage.getItem("nurseId"));
    const postError = ref(false);
    const loading = ref(false);
    const allRelativesInfo = ref({
      firstRelative: {},
      secondRelative: {},
      thirdRelative: {},
    });
    const allInfo = ref({
      nurseFamily: allRelativesInfo.value,
      Guarantee: "",
      nurseOtherInfo: {},
    });
    const error = ref(false);
    //check if any checkboxes left empty for error
    const checkboxRules = computed(() => {
      if (allInfo.value.Guarantee === "") {
        error.value = true;
        return true;
      } else {
        error.value = false;
        return false;
      }
    });
    //inputs validation
    const rules = ref({
      text: [
        (value) => {
          if (/[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]$/.test(value)) return true;
          return "فیلد اجباری را پر کنید";
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
    });
    //make an object of input's name as key and v-model's value as the object value
    const updateFormData = (name, value, id) => {
      if (id === "firstRelative") {
        allRelativesInfo.value.firstRelative = {
          ...allRelativesInfo.value.firstRelative,
          [name]: value,
        };
      } else if (id === "secondRelative") {
        allRelativesInfo.value.secondRelative = {
          ...allRelativesInfo.value.secondRelative,
          [name]: value,
        };
      } else if (id === "thirdRelative") {
        allRelativesInfo.value.thirdRelative = {
          ...allRelativesInfo.value.thirdRelative,
          [name]: value,
        };
      }
      if (id === "family") {
        allInfo.value.nurseOtherInfo = { ...allInfo.value.nurseOtherInfo, [name]: value };
      }
    };
    //make a request for posting data and another request for posting pdf and forward form to next step
    const postRelativesData = async (allInfo) => {
      try {
        const data = await useMyFetch("/Nurse/family", loading, postError, "put", "", allInfo);
      
        if (data) {
          localStorage.setItem("nurseEmploymentId", data.Id);
          router.push("/employment/terms");
          const [generatedPdf] = useMakePdf(); //get the pdf
          const formData = new FormData();
          formData.append("nurseId", nurseId.value);
          formData.append("pdf", generatedPdf);
          try {
            const data = await useMyFetch("/Nurse/pdf", loading, postError, "post", "", formData);
            console.log(data);
          } catch (e) {
            console.error("Error fetching data:", error);
          }
        }
      } catch (error) {
        error.value = true;
        console.error("Error fetching data:", error);
      }
    };
    //check the input's validation to make the final object and post it and store it in local storage
    const submit = (valid) => {
      postError.value = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
      localStorage.setItem("relativesInfo", JSON.stringify(allInfo.value));
      const relativesToArray = Object.values(allRelativesInfo.value).map((relatives) => ({
        information: relatives.information,
        knowTime: relatives.knowTime,
        name: relatives.name,
        phoneNumber: relatives.phoneNumber,
      }));
      const allInfoPost = {
        ...allInfo.value,
        nurseFamily: relativesToArray,
        nurseId: nurseId.value,
      };
      if (!checkboxRules.value && valid) {
        postRelativesData(allInfoPost);
      }
    };
    //form backward button
    const routBackHandler = () => {
      router.push("/employment/upload-image");
    };
    //check if local storage has item
    const getItemFromLocalStorage = () => {
      if (localStorage.getItem("relativesInfo")) {
        allInfo.value = JSON.parse(localStorage.getItem("relativesInfo"));
        allRelativesInfo.value = allInfo.value.nurseFamily;
      }
    };

    onMounted(() => {
      getItemFromLocalStorage();
    });
    return {
      inputFields,
      rules,
      submit,
      routBackHandler,
      error,
      updateFormData,
      allRelativesInfo,
      allInfo,
      loading,
      postError,
    };
  },
};
</script>
