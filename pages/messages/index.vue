<template>
  <div>
    <VApp>
      <pageBaseLayout title="پیام ها" :subPagesMode="true" @baseRouteBackHandler="routBackHandler">
        <v-row>
          <v-container>
            <v-col cols="12">
              <v-col
                v-for="i in requests"
                :key="i"
                cols="12"
                class="d-flex justify-end align-center"
              >
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
          </v-container>
          <v-divider color="teal-accent-4" thickness="3"> </v-divider>
        </v-row>
      </pageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import pageBaseLayout from "~/components/pageBaseLayout.vue";
export default {
  components: { pageBaseLayout },
  setup() {
    const router = useRouter();
    const requests = ref([
      { title: "درخواست های من:", amount: 0, id: 1 },
      { title: "درخواست های تایید شده:", amount: 0, id: 2 },
      { title: "درخواست های رد شده:", amount: 0, id: 3 },
      { title: "پیام های من:", amount: 0, id: 4 },
    ]);
    const routBackHandler = () => {
      router.back();
    };
    return {
      requests,
      routBackHandler,
    };
  },
};
</script>
<style></style>
