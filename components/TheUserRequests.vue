<template>
  <v-row>
    <v-container style="padding: 0">
      <v-col sm="5" cols="8" md="12" xl="12">
        <v-col v-for="i in requests" :key="i" cols="12" class="d-flex justify-end align-center">
          <p class="text-right text-teal-accent-4 font-weight-bold" style="font-size: 0.8rem">
            {{ i.title }}
          </p>
          <v-badge
            :color="i.id == 4 ? 'red' : 'teal-accent-4'"
            :content="i.amount"
            inline
          ></v-badge>
        </v-col>
      </v-col>
      <v-col sm="7" cols="4" ></v-col>
    </v-container>
  </v-row>
</template>
<script>
export default {
  setup() {
    const requests = ref([
      { title: "درخواست های من:", amount: 0, id: 1 },
      { title: "درخواست های تایید شده:", amount: 0, id: 2 },
      { title: "درخواست های رد شده:", amount: 0, id: 3 },
      { title: "پیام های من:", amount: 0, id: 4 },
    ]);
    return {
      requests,
    };
  },
};
</script>
<style></style>
