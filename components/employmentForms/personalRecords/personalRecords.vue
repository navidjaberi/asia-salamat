<template>
  <div>
    <VApp>
      <pageBaseLayout
        title="سوابق شخصی"
        formClass="personal-records"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <v-row v-for="i in recordInfo" :key="i.id">
          <v-col cols="3">
            <v-select
              :items="['بله', 'خیر']"
              variant="underlined"
              color="teal-accent-4"
              class="align mb-2"
              v-model="i.value"
            ></v-select>
          </v-col>
          <v-col cols="9" class="d-flex align-center justify-end text-right">
            <p style="font-weight: bold; font-size: 0.8rem">{{ i.title }}</p>
          </v-col>
          <v-divider></v-divider>
        </v-row>
      </pageBaseLayout>
    </VApp>
  </div>
</template>

<script>
import formInputs from "./formInputs";
import pageBaseLayout from "~/components/pageBaseLayout.vue";

export default {
  components: { pageBaseLayout },

  setup() {
    const recordInfo = ref(formInputs);
    const router = useRouter();

    const submit = () => {
      router.push("/employment/collaboration-terms");
    };
    const routBackHandler = () => {
      router.push("/employment/personal-info");
    };
    return { recordInfo, submit, routBackHandler, };
  },
};
</script>
