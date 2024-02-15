<template>
  <v-container>
    <v-row class="my-8">
      <v-col cols="12" xl="6" lg="6" class="pa-0">
        <v-card class="mx-auto mb-5" max-width="344">
          <v-col class="d-flex justify-center align-center py-10">
            <p class="text-teal-accent-4  mr-1 text-title">۰۲۶-۳۲۴۰۶۷۰۵</p>
            <p class=" text-title">: تماس با پشتیبانی</p>
            <v-icon size="x-large" class="bg-teal-accent-4 rounded-circle pa-1 ml-4"
              >mdi-phone</v-icon
            >
          </v-col>
        </v-card>
      </v-col>
      <v-col cols="12" xl="6" lg="6" class="pa-0">
        <v-card class="mx-auto" max-width="344" @click="openMessenger">
          <v-col class="d-flex justify-center align-center py-10">
            <p class="text-teal-accent-4  mr-1 text-title">(پاسخ سریع)</p>
            <p class=" text-title">:چت آنلاین</p>
            <v-icon color="teal-accent-4" size="x-large" class="ml-4 pa-1">mdi-message</v-icon>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>
<script>
import { useSupportMsg } from "~/store/supportMsg";
export default {
  setup() {
    definePageMeta({
      layout: "main",
    });
    const store = useSupportMsg();
    const router=useRouter()
    const allMessages = computed(() => {
      return store.getAllMessages;
    });
    const supportMessages = computed(() => {
      return allMessages.value.filter((e) => {
        return !e.IsUserSend;
      });
    });
    const openMessenger=()=>{
      router.push('/messenger')
    }
    return {
      allMessages,
      openMessenger
    };
  },
};
</script>
<style>

</style>
