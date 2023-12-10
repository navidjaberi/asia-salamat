<template>
  <div>
    <VApp>
      <pageBaseLayout
        title="آپلود عکس"
        formClass="upload-image"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <v-row class="mb-7">
          <v-col cols="12" v-for="(i, index) in inputFields" key="i">
            <p style="font-size: 0.9rem" class="text-right">{{ i.title }}</p>
            <v-file-input
              accept="image/*"
              show-size
              prepend-icon="none"
              color="teal-accent-4"
              label="انتخاب عکس"
              :rules="index === 3 ? [] : rules"
              required
              prepend-inner-icon="mdi-camera"
              ><v-icon slot:prepend-inner> </v-icon
            ></v-file-input>
            <v-divider v-if="index < 3"></v-divider>
          </v-col>
        </v-row>
      </pageBaseLayout>
    </VApp>
  </div>
</template>

<script>
import formInputs from "./formInputs.ts";
import { ref } from "@vue/composition-api";
import pageBaseLayout from "~/components/pageBaseLayout.vue";

export default {
  components: { pageBaseLayout },

  setup() {
    const inputFields = ref(formInputs);
    const router = useRouter();
    const rules = ref([
      (value) => {
        if (!value || !value.length) {
          return "عکس را انتخاب کنید";
        }
        if (value[0].size > 10000000) {
          return "عکس باید کمتر از ۱۰ مگابایت باشد";
        }

        return true;
      },
    ]);
    const submit = async (valid) => {
      if (valid) {
        router.push("/employment/relatives-info");
      }
    };

    const routBackHandler = () => {
      router.push("/employment/collaboration-terms");
    };
    onMounted(() => {});
    return { inputFields, rules, submit, routBackHandler };
  },
};
</script>
