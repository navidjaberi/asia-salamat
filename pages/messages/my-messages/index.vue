<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="پیام های من"
        :subPagesMode="true"
        @baseRouteBackHandler="routBackHandler"
      >
      <MessagesBaseNoMessageAlert v-if="messages <= 0"/>
        <v-row class="mx-auto" no-gutters v-else>
          <v-col xxl="5" xl="6" lg="7" md="8" cols="12" class="mx-auto">
            <v-row no-gutters>
              <v-col cols="12" class="mx-auto px-3">
                <v-col
                  v-for="i in messages"
                  :key="i"
                  cols="12"
                  class="d-flex justify-center flex-column align-center mx-auto bg-teal-lighten-5 rounded-lg mt-3 px-3"
                >
                  <p class="text-right  text">
                    {{ i.Content }}
                  </p>
                  <p class="text text-grey-darken-1">{{ getMessageTime(i.UpdatedAt) }}</p>
                </v-col>
              </v-col>
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
    const messages = ref([]);
     //backward button
    const routBackHandler = () => {
      router.push("/messages");
    };
    //convert messages time to readable format 
    const getMessageTime = (i) => {
      const dateObject = new Date(i);
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
      const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      return formattedTime;
    };
    onMounted(() => {
      messages.value = store.getUserMessages;
    });
    return {
      routBackHandler,
      messages,
      getMessageTime,
    };
  },
};
</script>
<style></style>
