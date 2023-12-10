<template>
  <div>
    <VApp>
      <pageBaseLayout
        title="اطلاعات شخصی"
        formClass="personal-info"
        :bottomBtn="true"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <v-container>
          <v-text-field
            variant="underlined"
            label="نام و نام خانوادگی"
            color="teal-accent-4"
            class="align py-2 px-3"
            :rules="rules.text"
            required
          >
            <template v-slot:error>
              <p class="text-teal-accent-4"></p>
            </template>
            <template v-slot:append>
              <span class="text-error">*</span>
              <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1">mdi-account </v-icon>
            </template>
          </v-text-field>
          <v-text-field
            variant="underlined"
            label="شماره همراه"
            color="teal-accent-4"
            class="align py-2 px-3"
            :rules="rules.num"
            required
          >
            <template v-slot:error>
              <p class="text-teal-accent-4"></p>
            </template>
            <template v-slot:append>
              <span class="text-error">*</span>
              <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1">mdi-phone </v-icon>
            </template>
          </v-text-field>
          <v-text-field
            variant="underlined"
            label="نحوه آشنایی با ما"
            color="teal-accent-4"
            class="align py-2 px-3"
            required
          >
            <template v-slot:error>
              <p class="text-teal-accent-4"></p>
            </template>
            <template v-slot:append>
              <v-icon color="teal-accent-4" class="ml-2" style="opacity: 1"
                >mdi-human-greeting-proximity</v-icon
              >
            </template>
          </v-text-field>
        </v-container>
      </pageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import pageBaseLayout from "~/components/pageBaseLayout.vue";
export default {
  components: { pageBaseLayout },
  setup() {
    const routes = useRoute();
    const router = useRouter();
    const form = ref(null);
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
      const currentRoute = routes.fullPath.substring(0, routes.fullPath.indexOf("/info"));
      if (valid) {
        router.push(`${currentRoute}/support`);
      }
    };
    const routBackHandler = () => {
      const currentRoute = routes.fullPath.substring(0, routes.fullPath.indexOf("/info"));
      router.push(currentRoute);
    };
    return {
      form,
      rules,
      submit,
      routBackHandler,
    };
  },
};
</script>
