import { Style } from '#build/components'; import { Style } from '#build/components';
<template>
  <div>
    <VApp>
      <pageBaseLayout
        title="اطلاعات دوستان و آشنایان"
        formClass="relatives"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <p class="text-right" style="font-weight: bold; font-size: 0.8rem">
          :لطفا سه نفر را معرفی بفرمایید که شما را میشناسند
        </p>
        <v-row>
          <v-col cols="12" v-for="(item, index) in inputFields" style="padding: 0px"
            ><v-row style="margin: 0px">
              <v-col
                v-for="(input, inputIndex) in item.inputs"
                :cols="item.type === 'relatives' ? 12 : 6"
                :key="inputIndex"
                style="padding: 0px; padding-top: 10px"
              >
                <v-text-field
                  variant="underlined"
                  :label="input.title"
                  color="teal-accent-4"
                  class="align py-2 px-3"
                  :rules="
                    input.notRequired ? undefined : input.type === 'num' ? rules.num : rules.text
                  "
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
              در صورت مشغول به کار شدن کدام یک از موارد را جهت ضمانت میتوانید نزد شرکت قرار دهید؟
            </p>
          </v-col>
          <v-col cols="12" style="padding: 0px">
            <v-checkbox
              label="(به مبلغ ۵۰ میلیون تومان)سفته"
              color="teal-accent-4"
              value="promissory"
              hide-details
              class="checkbox"
              v-model="guarantee"
            ></v-checkbox>
            <v-checkbox
              label="(به ارزش ۱۰۰ میلیون تومان)چک"
              color="teal-accent-4"
              value="check"
              class="checkbox"
              hide-details
              v-model="guarantee"
            ></v-checkbox>
            <v-checkbox
              label="جواز کسب"
              color="teal-accent-4"
              value="workLicense"
              class="checkbox"
              hide-details
              v-model="guarantee"
            ></v-checkbox>
            <v-checkbox
              value="represent"
              color="teal-accent-4"
              label="(کارمند دولتی)معرف"
              class="checkbox"
              hide-details
              v-model="guarantee"
            ></v-checkbox>
          </v-col>
          <p class="error" v-if="error">لطفا حداقل یک گزینه را انتخاب کنید</p>
        </v-row>
      </pageBaseLayout>
    </VApp>
  </div>
</template>

<script>
import formInputs from "./formInputs.ts";
import pageBaseLayout from "~/components/pageBaseLayout.vue";

export default {
  components: { pageBaseLayout },

  setup() {
    const inputFields = ref(formInputs);
    const router = useRouter();
    const guarantee = ref([]);
    const error = ref(false);
    const checkboxRules = computed(() => {
      if (guarantee.value.length === 0) {
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
          return "لطفا فیلد اجباری را پر کنید";
        },
      ],
      num: [
        (value) => {
          if (value?.length === 11 && /[0-9-]+/.test(value) && /^09\d{9}$/.test(value)) return true;
          return "شماره تلفن را به درستی وارد کنید(از اعداد انگلیسی استفاده کنید)";
        },
      ],
    });
    const submit = async (valid) => {
      if (!checkboxRules.value && valid) {
        router.push("/employment/terms");
      }
    };
    const routBackHandler = () => {
      router.push("/employment/upload-image");
    };
    return { inputFields, rules, submit, routBackHandler, guarantee, error };
  },
};
</script>
