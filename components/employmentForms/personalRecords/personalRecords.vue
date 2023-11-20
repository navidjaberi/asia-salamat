<template>
  <div>
    <VApp>
      <v-app-bar color="grey-lighten-5" elevation="1">
        <v-app-bar-nav-icon variant="text" style="position: absolute"
          ><NuxtLink to="/employment/personal-info"
            ><v-icon>mdi-arrow-left</v-icon></NuxtLink
          ></v-app-bar-nav-icon
        >
        <v-col> <p class="text-center font-weight-bold">سوابق شخصی</p></v-col>
      </v-app-bar>
      <v-main>
        <v-form class="px-4 mt-6 persnoal-records" @submit.prevent="submit">
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
          <v-row class="mt-7">
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
import formInputs from "./formInputs";
export default {
  setup() {
    const recordInfo = ref(formInputs);

    const router = useRouter();

    const submit = () => {
      router.push("/employment/collaboration-terms");
    };
    const routBackHandler = () => {
      router.back();
    };
    return { recordInfo, submit, routBackHandler };
  },
};
</script>
<style lang="scss">
.persnoal-records {
  .v-counter {
    display: none !important;
  }
 
}
</style>
