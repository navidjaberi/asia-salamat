<template>
  <v-navigation-drawer
    v-model="openChatroom"
    temporary
    location="bottom"
    class="chat-box"
    :width="400"
  >
    <Chatroom />
  </v-navigation-drawer>
  <v-layout style="height: 70vh">
    <v-main>
      <v-container>
        <v-list class="text-right text-grey-darken-2 font-weight-bold" style="font-size: 14px">
          <v-list-item>
            تماس با پشتیبانی:
            <span class="text-teal-accent-4">۳۲۴۰۶۷۰۵-۰۲۶</span>
            <v-icon icon="mdi-phone" color="teal-accent-4" class="ml-3"></v-icon>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click.stop="openChatroom = !openChatroom">
            چت آنلاین:
            <span class="text-teal-accent-4">(پاسخ سریع)</span>
            <v-icon icon="mdi-message" color="teal-accent-4" class="ml-3"></v-icon>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </v-layout>
  <v-container class="chat-box d-flex justify-end mr-6">
    <v-btn
      icon="mdi-message-text"
      color="teal-accent-4"
      size="x-large"
      @click.stop="openChatroom = !openChatroom"
    ></v-btn>
  </v-container>
</template>
<script>
import Chatroom from "~/components/support/TheChatroom.vue";
export default {
  components: { Chatroom },
  setup() {
    definePageMeta({
      layout: "main",
    });
    const openChatroom = ref(false);

    return {
      openChatroom,
    };
  },
};
</script>
