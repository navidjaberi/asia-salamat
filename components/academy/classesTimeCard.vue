<template>
  <v-card
    class="text-center font-weight-bold pa-8 mx-auto mt-5"
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
    class="text-center font-weight-bold pa-8 mx-auto mt-5"
    width="370"
    max-width="500"
    elevation="2"
  >
    <p class="text-title">ساعت های خود را انتخاب کنید</p>
    <v-row>
      <v-col class="mt-5 d-flex justify-space-around">
        <v-btn variant="elevated" color="teal-accent-4" >{{ hours }}</v-btn>
      
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
    hours:{
      type:String,
      required:true,
      default:''
    }
  },
  setup(props) {
    const even = ref(false);
    const odd = ref(false);
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
    };
    const reactiveProps = computed(() => [props.oddDays, props.evenDays]);
    watch(reactiveProps, ([newOdd, newEven]) => {
      if (newOdd && newEven) {
        newOdd = false;
        even.value = newEven;
      }
      odd.value = newOdd;
      even.value = newEven;
    });

    return {
      dayToggleHandler,
      even,
      odd,
  
    };
  },
};
</script>
