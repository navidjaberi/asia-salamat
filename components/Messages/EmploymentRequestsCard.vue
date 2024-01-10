<template>
  <v-card
    variant="flat"
    class="d-flex align-center pa-1 mx-3 my-3"
    color="blue-grey-darken-4"
    height="150"
  >
    <v-row>
      <v-col cols="12" class="text-center">
        <p class="text-title font-weight-bold">{{ name }} :نام</p>
        <v-col>
          <v-chip
            v-for="i in shifts"
            :key="i"
            color="teal-accent-4"
            label
            variant="elevated"
            class="text-subtitle pa-2 mx-1 justify-center"
          >
            {{ i }}
          </v-chip>
          <p class="text-title font-weight-bold">{{ getDate }}:تاریخ درخواست</p>
        </v-col>

        <v-chip
          key="i"
          :color="getStatus.color"
          size="x-large"
          label
          variant="elevated"
          class="text-subtitle pa-2 mx-1 justify-center"
        >
          {{ getStatus.text }}
        </v-chip>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: [null, Number],
      required: true,
    },
    shifts: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const getStatus = computed(() => {
      if (props.status === 0) {
        return { text: "تایید شده", color: "green" };
      } else if (props.status === 1) {
        return { text: "رد شده", color: "red" };
      } else if (props.status === 3) {
        return { text: "حذف شده", color: "orange" };
      } else {
        return { text: "در حال بررسی", color: "grey-darken-1" };
      }
    });

    const getDate = computed(() => {
      let d = new Date(props.date).toLocaleDateString("fa-IR");
      return d;
    });
    return { getDate, getStatus };
  },
};
</script>
