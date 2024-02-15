<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="پیام ها"
        :subPagesMode="true"
        @baseRouteBackHandler="routBackHandler"
      >
        <BaseLoadingAndError
          class="mt-8"
          :loading="loading"
          :error="error"
          v-if="error || loading"
          :postData="false"
          @reload="reloadHandler"
        />
    
        <v-row no-gutters>
          <v-col xxl="5" xl="6" lg="7" md="8" cols="12" class="mx-auto">
            <v-row no-gutters>
              <v-col cols="12">
                <v-col
                  v-for="i in requests"
                  :key="i"
                  cols="12"
                  class="d-flex justify-end align-center"
                >
                  <NuxtLink :to="i.link">
                    <p
                      class="text-right text-teal-accent-4 "
                      style="font-size: 0.6rem"
                    >
                      {{ i.title }}
                    </p>
                  </NuxtLink>
                  <v-badge v-if="i.id == 3" color="red" :content="i.amount" inline></v-badge>
                </v-col>
              </v-col>
              <v-divider color="teal-accent-4" thickness="3"> </v-divider>
            </v-row>
          </v-col>
        </v-row>
      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import { useGetUserInfo } from "~/store/userInfo";
export default {
  setup() {
    const router = useRouter();
    const store = useGetUserInfo();
    const loading = ref(false);
    const error = ref(false);
    const messages = computed(() => {
      return store.getUserMessages;
    });
    const requests = ref([
      { title: "درخواست های من", id: 1, link: "messages/my-requests" },
      { title: "درخواست های استخدام", id: 2, link: "messages/employment-requests" },
      {
        title: "پیام های من",
        amount: 0,
        id: 3,
        link: "messages/my-messages",
      },
    ]);
    const getMsgData = () => {
      store.getUserInfo(loading, error);
    };
    watch(messages, () => {
      requests.value[2].amount = store.getUserMessages.length;
    });
    const routBackHandler = () => {
      router.push("/home");
    };
    const reloadHandler = () => {
      error.value=false
      loading.value=false
      getMsgData();
    };

    onMounted(() => {
      getMsgData();
    });
    return {
      requests,
      routBackHandler,
      messages,
      loading,
      error,
      reloadHandler,
    };
  },
};
</script>
<style></style>
