<template>
  <v-card
    class="text-center  pa-8 mx-auto mt-5 class-time-card"
    width="370"
    max-width="500"
    elevation="2"
  >
    <p class="text-title">روز های خود را انتخاب کنید</p>
    <v-col class="mt-5 d-flex justify-space-around">
      <v-btn
        v-if="evenDays"
        :color="even ? 'teal-accent-4' : ''"
        variant="elevated"
        @click="dayToggleHandler('even')"
        >روز های زوج
      </v-btn>
      <v-btn
        v-if="oddDays"
        :color="odd ? 'teal-accent-4' : ''"
        variant="elevated"
        @click="dayToggleHandler('odd')"
        >روز های فرد
      </v-btn>
    </v-col>
  </v-card>
  <v-card
    class="text-center  pa-8 mx-auto mt-5 class-time-card"
    width="370"
    max-width="500"
    elevation="2"
  >
    <p class="text-title">ساعت های خود را انتخاب کنید</p>
    <v-row>
      <v-col class="mt-5 d-flex justify-space-around">
        <v-btn
          v-for="(item, index) in hours"
          variant="elevated"
          :color="hourColor(index)"
          :key="index"
          @click="hourHandler(index, item)"
          >{{ item }}</v-btn
        >
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    evenDays: {
      type: Boolean,
      required: true,
    },
    oddDays: {
      type: Boolean,
      required: true,
    },
    hours: {
      type: String,
      required: true,
      default: "test",
    },
  },
  emits: ["getHour", "getDay"],
  setup(props, context) {
    //split each class's hours and push it into an array as an item
    const hours = computed(() => {
      const array = props.hours.split(",");
      const trimmedArray = array.map((item) => item.trim());
      return trimmedArray;
    });
    //handle the user's class hour select and emit it to parent component
    const hourHandler = (index, item) => {
      selectedHourIndex.value = index;
      context.emit("getHour", item);
    };
    const even = ref(false);
    const odd = ref(false);
    //default hour select
    const selectedHourIndex = ref(0);
    //set the hour active button color
    const hourColor = (index) => {
      return index === selectedHourIndex.value ? "teal-accent-4" : "";
    };
    //handle the user's class dat select and emit it to parent component
    const dayToggleHandler = (type) => {
      if (type === "even") {
        even.value = true;
        odd.value = false;
      } else if (type === "odd") {
        even.value = false;
        odd.value = true;
      } else if (type === "even" && type === "odd") {
        even.value = true;
        odd.value = false;
      }
      context.emit("getDay", type);
    };
    const reactiveProps = computed(() => [props.oddDays, props.evenDays]);
    //watch even and odd button values for track the changes
    watch(reactiveProps, ([newOdd, newEven]) => {
      if (newOdd && newEven) {
        newOdd = false;
        even.value = newEven;
      }
      odd.value = newOdd;
      even.value = newEven;
    });
    //make a default value for even and odd buttons
    const daysBtnDefaultActive = () => {
      if (!props.evenDays && props.oddDays) {
        dayToggleHandler("odd");
      } else {
        dayToggleHandler("even");
      }
    };
    onMounted(() => {
      daysBtnDefaultActive();
      //set a timeout for waiting to get hours data's from parent component
      setTimeout(() => {
        hourHandler(0, hours.value[0]);
      }, 2000);
    });
    return {
      dayToggleHandler,
      even,
      odd,
      hours,
      hourHandler,
      hourColor,
    };
  },
};
</script>
<style>
.class-time-card{
  .v-btn__content{
font-size: 0.6rem;
  }
}
</style>