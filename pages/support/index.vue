<template>
  <BaseLoadingAndError class="mt-8" :loading="loading" :error="error" v-if="error || loading" />
  <v-navigation-drawer
    v-model="openChatroom"
    temporary
    location="bottom"
    class="chat-box"
    :width="400"
  >
    <SupportTheChatroom :messages="allMessages" :key="allMessages.length" />
  </v-navigation-drawer>
  <v-layout style="height: 60vh">
    <v-main>
      <v-container>
        <v-row class="my-8">
          <v-col cols="12" xl="6" lg="6" class="pa-0">
            <v-card class="mx-auto mb-5" max-width="344">
              <v-col class="d-flex justify-center align-center py-10">
                <p class="text-teal-accent-4 font-weight-bold mr-1 text-title">۰۲۶-۳۲۴۰۶۷۰۵</p>
                <p class="font-weight-bold text-title">: تماس با پشتیبانی</p>
                <v-icon size="x-large" class="bg-teal-accent-4 rounded-circle pa-1 ml-4"
                  >mdi-phone</v-icon
                >
              </v-col>
            </v-card>
          </v-col>
          <v-col cols="12" xl="6" lg="6" class="pa-0">
            <v-card class="mx-auto" max-width="344" @click.stop="openChatroom = !openChatroom">
              <v-col class="d-flex justify-center align-center py-10">
                <p class="text-teal-accent-4 font-weight-bold mr-1">(پاسخ سریع)</p>
                <p class="font-weight-bold">:چت آنلاین</p>
                <v-icon color="teal-accent-4" size="x-large" class="ml-4 pa-1">mdi-message</v-icon>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
  <v-container class="chat-box d-flex justify-end mr-6 support">
    <v-btn
      class="btn-animation"
      color="teal-accent-4"
      size="x-large"
      @click.stop="openChatroom = !openChatroom"
      ><v-badge color="white" :content="msgAmount"> </v-badge>
      <v-icon size="xx-large">mdi-message-text</v-icon>
    </v-btn>
  </v-container>
</template>
<script>
import { useSupportMsg } from "~/store/supportMsg";
export default {
  setup() {
    definePageMeta({
      layout: "main",
    });
    const loading = ref(false);
    const error = ref(false);
    const store = useSupportMsg();
    const allMessages = computed(() => {
      return store.getAllMessages;
    });
    const openChatroom = ref(false);
    const supportMessages = computed(() => {
      return allMessages.value.filter((e) => {
        return !e.IsUserSend;
      });
    });
    const msgAmount = computed(() => {
      return supportMessages.value.length;
    });
    const fetchData = () => {
      store.getSupportMessages(loading, error);

      setTimeout(fetchData, 5 * 60 * 1000);
    };
    onMounted(() => {
      fetchData();
    });
    onBeforeUnmount(() => {
      clearTimeout(fetchData);
    });
    return {
      openChatroom,
      msgAmount,
      allMessages,
      error,
      loading,
    };
  },
};
</script>
<style>
.support {
  .v-badge__badge {
    bottom: calc(100% - 17px) !important;
    left: calc(100% - -21px) !important;
    z-index: 1;
  }
}
</style>
