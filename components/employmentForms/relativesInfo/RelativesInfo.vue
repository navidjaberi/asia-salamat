<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="اطلاعات دوستان و آشنایان"
        formClass="relatives"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <v-row no-gutters>
          <v-col xxl="5" xl="6" lg="7" md="8" cols="12" class="pa-0 mx-auto">
            <p class="text-right" style="font-weight: bold; font-size: 0.8rem">
              :لطفا سه نفر را معرفی بفرمایید که شما را میشناسند
            </p>
            <v-row>
              <v-col cols="12" v-for="(item, index) in inputFields" class="pa-0" :key="item.id"
                ><v-row style="margin: 0px" v-if="item.id === 'firstRelative'">
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
                          ? rules.num
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
                <v-row style="margin: 0px" v-if="item.id === 'secondRelative'">
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
                          ? rules.num
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
                <v-row style="margin: 0px" v-if="item.id === 'thirdRelative'">
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
                          ? rules.num
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
                <v-row style="margin: 0px" v-if="item.id === 'family'">
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
                          ? rules.num
                          : rules.text
                      "
                      :model-value="allInfo.family[input.id]"
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
                <p class="text-right" style="font-weight: bold; font-size: 0.8rem">
                  در صورت مشغول به کار شدن کدام یک از موارد را جهت ضمانت میتوانید نزد شرکت قرار
                  دهید؟
                </p>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-radio-group v-model="allInfo.guarantee">
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
import { jsPDF } from "jspdf";
import account from "~/assets/img/pics/account.jpg";
import stamp from "~/assets/img/pics/stamp.png";
import { AmiriRegular } from "~/assets/fonts/amiri-font";
import { useNurseInfoStore } from "~/store/nurseInfo";

export default {
  setup() {
    const inputFields = ref(formInputs);
    const router = useRouter();
    const store = useNurseInfoStore();
    const allRelativesInfo = ref({
      firstRelative: {},
      secondRelative: {},
      thirdRelative: {},
    });
    const allInfo = ref({
      nurseFamily: allRelativesInfo.value,
      guarantee: "",
      family: {},
    });
    const error = ref(false);
    const picture = ref(localStorage.getItem("picture"));
    const toFarsiNumber = (n) => {
      const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      return n
        .toString()
        .split("")
        .map((x) => farsiDigits[x])
        .join("");
    };

    const checkboxRules = computed(() => {
      if (allInfo.value.guarantee === "") {
        error.value = true;
        return true;
      } else {
        error.value = false;
        return false;
      }
    });

    const rules = ref({
      text: [
        (value) => {
          if (value) return true;
          return "فیلد اجباری را پر کنید";
        },
      ],
      num: [
        (value) => {
          if (value?.length === 11 && /[0-9-]+/.test(value) && /^09\d{9}$/.test(value)) return true;
          return "شماره تلفن را به درستی وارد کنید(از اعداد انگلیسی استفاده کنید)";
        },
      ],
    });
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
        allInfo.value.family = { ...allInfo.value.family, [name]: value };
      }
    };
    const createImg=(file)=>{
      const reader = new FileReader();
       reader.onload = (event) => {
          img.value=event.target.result
         
        }
        reader.readAsDataURL(file);
    }
    const submit = async (valid) => {
      if (!checkboxRules.value && valid) {
        localStorage.setItem("relativesInfo", JSON.stringify(allInfo.value));
        router.push("/employment/terms");
        const localStoragePdfData = localStorage.getItem("employmentPersonalInfo");
        const pdfData = JSON.parse(localStoragePdfData);
        let today = new Date().toLocaleDateString("fa-IR");
        let randomNum = Math.floor(1000 + Math.random() * 9000);
        const randomFarsiNum = toFarsiNumber(randomNum);
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "a3",
        });
        doc.addFileToVFS("Amiri-Regular.ttf", AmiriRegular);
        doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
        doc.setFont("Amiri"); // set font
        doc.setFontSize(30);
        doc.text("بسمه تعالی", 6, 1, { align: "right", lang: "ar" });
        doc.setFontSize(19);
        doc.text(today + ":تاریخ", 2, 1.5, { align: "right", lang: "ar" });
        doc.text(randomFarsiNum + ":شماره", 2, 1, { align: "right", lang: "ar" });
        doc.text(".........:پیوست", 2, 2, { align: "right", lang: "ar" });
        doc.addImage(img.value ?  img.value : account, "JPEG", 9, 1, 2.5, 3, "FAST");
        doc.addImage(stamp, "PNG", 9, 3.7, 2.5, 0.8);
        doc.setFontSize(30);
        doc.text("سرپرست محترم تشخیص هویت", 11.2, 5.2, { align: "right", lang: "ar" });
        doc.setFontSize(22);
        doc.text("باسلام", 11.2, 6, { align: "right", lang: "ar" });
        doc.text(
          `احتراما شرکت آسیا سلامت اندیشان البرز خانم/آقا ${pdfData.name} فرزند ${pdfData.fatherName} `,
          11.2,
          6.8,
          { align: "right", lang: "ar" }
        );
        doc.text(
          ` متولد ${pdfData.birthday} به شماره شناسنامه ${pdfData.nationalNumber} و کد ملی ${pdfData.nationalCode}`,
          11.2,
          7.6,
          { align: "right", lang: "ar" }
        );
        doc.text(`.را جهت تایید عدم سابقه کیفری به حضورتان معرفی میگردد `, 11.2, 8.4, {
          align: "right",
          lang: "ar",
        });
        doc.setFontSize(19);
        doc.text(
          `کرج ،رجایی شهر ، خیابان آزادی ، نبش ۶ شرقی ، فاز  ۱ ، پلاک ۱۸۶ ، واحد ۱`,
          11.2,
          10,
          { align: "right", lang: "ar" }
        );
        doc.text(`۳۱۴۶۹۸۳۳۵۳:کدپستی`, 11.2, 10.9, { align: "right", lang: "ar" });
        doc.text(`با تشکر`, 2, 14, { align: "right", lang: "ar" });
        doc.addPage();
        doc.setFontSize(30);
        doc.text("بسمه تعالی", 6, 1, { align: "right", lang: "ar" });
        doc.setFontSize(19);
        doc.text(today + ":تاریخ", 2, 1.5, { align: "right", lang: "ar" });
        doc.text(randomFarsiNum + ":شماره", 2, 1, { align: "right", lang: "ar" });
        doc.text(".........:پیوست", 2, 2, { align: "right", lang: "ar" });
        doc.addImage(picture.value ? picture.value : account, "JPEG", 9, 1, 2.5, 3, "FAST");
        doc.addImage(stamp, "PNG", 9, 3.7, 2.5, 0.8);
        doc.setFontSize(30);
        doc.text("سرپرست محترم آزمایشگاه", 11.2, 5.2, { align: "right", lang: "ar" });
        doc.setFontSize(22);
        doc.text("باسلام", 11.2, 6, { align: "right", lang: "ar" });
        doc.text(
          `احتراما شرکت آسیا سلامت اندیشان البرز خانم/آقا ${pdfData.name} فرزند ${pdfData.fatherName} `,
          11.2,
          6.8,
          { align: "right", lang: "ar" }
        );
        doc.text(
          ` متولد ${pdfData.birthday} به شماره شناسنامه ${pdfData.nationalNumber} و کد ملی ${pdfData.nationalNumber}`,
          11.2,
          7.6,
          { align: "right", lang: "ar" }
        );
        doc.text(`.را جهت انجام آزمایش عدم اعتیاد به حضورتان معرفی میگردد `, 11.2, 8.4, {
          align: "right",
          lang: "ar",
        });
        doc.setFontSize(19);
        doc.text(
          `کرج ،رجایی شهر ، خیابان آزادی ، نبش ۶ شرقی ، فاز  ۱ ، پلاک ۱۸۶ ، واحد ۱`,
          11.2,
          10,
          { align: "right", lang: "ar" }
        );
        doc.text(`۳۱۴۶۹۸۳۳۵۳:کدپستی`, 11.2, 10.9, { align: "right", lang: "ar" });
        doc.text(`با تشکر`, 2, 14, { align: "right", lang: "ar" });
        const dataUri = doc.output("datauristring");
        doc.save(`${pdfData.nationalCode}.pdf`);
        const newWindow = window.open();
        newWindow.document.write(
          '<iframe width="100%" height="100%" src="' + dataUri + '"></iframe>'
        );
      }
    };
    const routBackHandler = () => {
      router.push("/employment/upload-image");
    };
    onMounted(() => {
      if (localStorage.getItem("relativesInfo")) {
        allInfo.value = JSON.parse(localStorage.getItem("relativesInfo"));
        allRelativesInfo.value = allInfo.value.nurseFamily;
      }
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
    };
  },
};
</script>
