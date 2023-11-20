<template>
  <div>
    <VApp>
      <v-app-bar color="grey-lighten-5" elevation="1">
        <v-app-bar-nav-icon variant="text" style="position: absolute"
          ><NuxtLink to="/employment/collaboration-terms"
            ><v-icon>mdi-arrow-left</v-icon></NuxtLink
          ></v-app-bar-nav-icon
        >
        <v-col> <p class="text-center font-weight-bold">آپلود عکس</p></v-col>
      </v-app-bar>
      <v-main>
        <v-form class="px-4 mt-6 upload-image" @submit.prevent="submit" validate-on="submit">
          <v-row class="mb-7">
            <v-col cols="12" v-for="(i, index) in inputFields" key="i">
              <p style="font-size: 0.9rem" class="text-right">{{ i.title }}</p>
              <v-file-input
                accept="image/*"
                show-size
                prepend-icon="none"
                color="teal-accent-4"
                label="انتخاب عکس"
                :rules="rules"
                prepend-inner-icon="mdi-camera"
                ><v-icon slot:prepend-inner> </v-icon
              ></v-file-input>
              <v-divider v-if="index < 3"></v-divider>
            </v-col>
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
import formInputs from "./formInputs.ts";
export default {
  setup() {
    const inputFields = ref(formInputs);
    const router=useRouter()
    const rules = ref([
      (value) => {
        return (
          !value || !value.length || value[0].size < 10000000 || "عکس باید کمتر از ۱۰مگابایت باشد"
        );
      },
    ]);
    const submit=()=>{
      console.log('work');
    }
    const routBackHandler = () => {
      router.back();
    };
    return { inputFields, rules ,submit,routBackHandler};
  },
};
</script>
<style lang="scss">
.upload-image {
  .v-input {
    width: 190px !important;
    height: 190px !important;
    margin: 0 auto;
    margin-top: 1rem;
  }
  .v-label {
    font-size: 0.8rem;
  }
  .v-field--appended {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .v-field__prepend-inner {
    display: flex;
    justify-content: center;
    padding-top: 2rem !important;
  }
  .v-field__field {
    display: flex;
    justify-content: center;
  }
  .v-input__prepend {
    display: none;
  }
  .v-field__input {
    font-size: 0.7rem;
    margin-top: 0.5rem;
    color: #00bfa5;
    text-align: center;
  }
  .v-field__clearable {
    padding-bottom: 0.5rem;
  }
  .v-input__details{
    padding:0px!important;
    text-align:center;
   display: flex;
    align-items: center;
  }
  .v-messages__message{
    font-size:0.7rem;
    hyphens: auto
  }
}
</style>
