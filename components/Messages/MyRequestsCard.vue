<template>
  <v-card
    variant="flat"
    class="d-flex align-center pa-1 mb-3"
    color="blue-grey-darken-4"
    height="150"
  >
    <v-row>
      <v-col cols="8" class="text-center">
        <p class="text-title font-weight-bold">{{ title }}</p>
        <p class="text-subtitle">
          {{ mode === "nurseReserved" ? `تاریخ درخواست:${getDate}` : `قیمت کل:${price}` }}
        </p>
        <v-col>
          <v-chip
            color="teal-accent-4"
            label
            variant="elevated"
            class="text-subtitle pa-2 mx-1 justify-center"
          >
            {{ mode === "nurseReserved" ? getShifts : day }}
          </v-chip>
          <v-chip
            v-if="(mode === 'nurseReserved' && shift !== 0) || mode === 'classReserved'"
            color="teal-accent-4"
            label
            variant="elevated"
            class="text-subtitle pa-2 mx-1 justify-center"
          >
            {{ hours }}
          </v-chip>
          <v-chip
            v-if="installment"
            color="teal-accent-4"
            label
            variant="elevated"
            class="text-subtitle pa-2 mx-1 mt-2 justify-center"
          >
            قسطی
          </v-chip>
          <p v-if="mode === 'nurseReserved'" style="direction: rtl;" class="text-detail text-right mt-2">آدرس:{{ address }}</p>
        </v-col>
      </v-col>
      <v-col cols="4" class="d-flex align-center justify-center pa-0">
        <v-sheet
          :height="110"
          :width="110"
          rounded
          color="lime-lighten-3"
          class="d-flex align-center justify-center mr-4"
          ><p class="text-subtitle font-weight-bold">
            {{ mode === "nurseReserved" ? nurseCategory : "کلاس آموزشی" }}
          </p></v-sheet
        >
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    price: {
      type: String,
      required: false,
    },
    hours: {
      type: String,
      required: false,
    },
    day: {
      type: String,
      required: false,
    },
    installment: {
      type: Boolean,
      required: false,
    },
    shift: {
      type: Number,
      required: false,
    },
    category: {
      type: Number,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    gender: {
      type: Number,
      required: false,
    },
  },
  setup(props) {
    const nurseCategory = computed(() => {
      if (props.category === 0) {
        return "پرستار کودک";
      } else if (props.category === 1) {
        return "پرستار سالمند";
      } else if (props.category === 2) {
        return "پرستار بیمار";
      }
    });
    const getShifts = computed(() => {
      if (props.shift === 0) {
        return "شبانه روزی";
      } else if (props.shift === 1) {
        return " روزانه";
      } else if (props.shift === 2) {
        return "شبانه";
      } else if (props.shift === 3) {
        return "پاره وقت";
      }
    });
    const getDate = computed(() => {
      let d = new Date(props.date).toLocaleDateString("fa-IR");
      return d;
    });
    return { nurseCategory, getDate, getShifts };
  },
};
</script>
