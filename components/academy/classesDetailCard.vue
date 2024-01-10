<template>
  <v-row no-gutters class="my-4">
    <v-col cols="12" class="text-right text-title font-weight-bold">
      <v-row no-gutters class="my-4">
        <v-col cols="11">
          <p>
            جمع کل ساعت آموزشی <span class="text-teal-accent-4">{{ totalHours }}</span> (عملی و
            تئوری)
          </p>
        </v-col>
        <v-col class="text-left pl-4 flex-grow-0" cols="1">
          <v-icon color="teal-accent-4">mdi-check-decagram</v-icon>
        </v-col>
      </v-row>
      <v-row no-gutters class="my-4">
        <v-col cols="11">
          <p>
            زمان برگذاری کلاس : <span class="text-teal-accent-4">{{ timeHolding }}</span>
          </p>
        </v-col>
        <v-col class="text-left pl-4 flex-grow-0" cols="1">
          <v-icon color="teal-accent-4">mdi-check-decagram</v-icon>
        </v-col>
      </v-row>
      <v-row no-gutters class="my-4">
        <v-col cols="11">
          <p>ارائه مدرک بین المللی و قابل ترجمه از سازمان فنی و حرفه ای</p>
        </v-col>
        <v-col class="text-left pl-4 flex-grow-0" cols="1">
          <v-icon color="teal-accent-4">mdi-check-decagram</v-icon>
        </v-col>
      </v-row>
      <v-row no-gutters class="my-4">
        <v-col cols="11">
          <p>
            مبلغ شهریه <span class="text-teal-accent-4">{{ price }} تومان</span> (نقد و اقساط)
          </p>
        </v-col>
        <v-col class="text-left pl-4 flex-grow-0" cols="1">
          <v-icon color="teal-accent-4">mdi-check-decagram</v-icon>
        </v-col>
      </v-row>
      <v-col cols="12 my-5"
        ><p class="text-title text-center font-weight-bold">شرایط پرداخت</p></v-col
      >
      <v-row no-gutters class="my-4">
        <v-col cols="11">
          <p>
            پیش پرداخت : <span class="text-teal-accent-4">{{ prePaid }} تومان</span>
          </p>
        </v-col>
        <v-col class="text-left pl-4 flex-grow-0" cols="1">
          <v-icon color="teal-accent-4">mdi-check-decagram</v-icon>
        </v-col>
      </v-row>
      <v-row no-gutters class="my-4">
        <v-col cols="11">
          <p>
            تعداد قسط ماهانه : <span class="text-teal-accent-4">{{ installmentNumber }}</span>
          </p>
        </v-col>
        <v-col class="text-left pl-4 flex-grow-0" cols="1">
          <v-icon color="teal-accent-4">mdi-check-decagram</v-icon>
        </v-col>
      </v-row>
      <v-row no-gutters class="my-4">
        <v-col cols="11">
          <p>
            مبلغ قسط ماهانه :<span class="text-teal-accent-4">{{ installmentPrice }} تومان</span>
          </p>
        </v-col>
        <v-col class="text-left pl-4 flex-grow-0" cols="1">
          <v-icon color="teal-accent-4">mdi-check-decagram</v-icon>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    totalHours: {
      type: String,
      required: true,
      default: "",
    },
    timeHolding: {
      type: String,
      required: true,
      default: "",
    },
    price: {
      type: String,
      required: true,
      default: "",
    },
    prePaid: {
      type: String,
      required: true,
      default: "",
    },
    installmentNumber: {
      type: Number,
      required: true,
      default: 0,
    },
    installmentPrice: {
      type: String,
      required: true,
      default: "",
    },
  },
  setup() {},
};
</script>
<style></style>
