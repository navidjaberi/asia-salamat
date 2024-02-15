<template>
  <v-card
    variant="flat"
    class="d-flex align-center pa-1 mb-3"
    color="blue-grey-darken-4"
    height="150"
  >
    <v-row>
      <v-col cols="8" class="text-center">
        <p class="text-title ">{{ title }}</p>
        <p class="text-subtitle">
          {{ mode === "nurseReserved" ? `تاریخ درخواست:${getDate}` : `قیمت کل:${price}` }}
        </p>
        <v-col style="direction: rtl">
          <v-chip
            color="teal-accent-4"
            label
            variant="elevated"
            class="text-subtitle pa-2 mx-1   mt-1 justify-center"
          >
            {{ mode === "nurseReserved" ? getShifts : getDay }}
          </v-chip>
          <v-chip
            v-if="mode === 'nurseReserved' && shift !== 0"
            color="teal-accent-4"
            label
            variant="elevated"
            class="text-subtitle pa-2 mx-1 mt-1  justify-center"
          >
            ساعت {{ from }} تا {{ to }}
          </v-chip>
          <v-chip
            v-if="mode === 'classReserved'"
            color="teal-accent-4"
            label
            variant="elevated"
            class="text-subtitle pa-2 mx-1 mt-1  justify-center"
          >
            {{ hours }}
          </v-chip>
          <v-chip
            v-if="installment"
            color="teal-accent-4"
            label
            variant="elevated"
            class="text-subtitle pa-2 mx-1 mt-1 justify-center"
          >
            قسطی
          </v-chip>
          <p
            v-if="mode === 'nurseReserved'"
            style="direction: rtl"
            class="text-detail text-right mt-2"
          >
            آدرس:{{ address }}
          </p>
        </v-col>
      </v-col>
      <v-col cols="4" class="d-flex align-center justify-center pa-0">
        <v-sheet
          :height="110"
          :width="110"
          rounded
          color="lime-lighten-3"
          class="d-flex align-center justify-center mr-4"
          ><p class="text-subtitle ">
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
    to: {
      type: String,
      required: false,
    },
    from: {
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
    //get the nurseCategory info and convert it to readable format
    const nurseCategory = computed(() => {
      if (props.category === 0) {
        return "پرستار کودک";
      } else if (props.category === 1) {
        return "پرستار سالمند";
      } else if (props.category === 2) {
        return "پرستار بیمار";
      }
    });
    //get the nurse shifts info and convert it to readable format
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
    //get the data of request and convert it to readable persian data
    const getDate = computed(() => {
      let d = new Date(props.date).toLocaleDateString("fa-IR");
      return d;
    });
        //get the days of request and convert it to readable persian text
    const getDay=computed(()=>{
    if(props.day==='odd'){
      return 'روز های فرد'
    }else{
      return 'روز های زوج'
    }
    })
    return { nurseCategory, getDate, getShifts,getDay };
  },
};
</script>
