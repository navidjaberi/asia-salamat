<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="چت با پشتیبانی"
        :subPagesMode="true"
        :messenger="true"
        @baseRouteBackHandler="routBackHandler"
      >
        <v-container  class="chat-box pa-2 mx-auto">
          <v-row no-gutters>
            <v-col lg="6" xl="6" md="8" cols="12" class="mx-auto">
              <v-row no-gutters class="mb-10">
                <v-col class="pa-2" cols="12">
                  <div
                    v-for="(item, index) in chat"
                    :key="index"
                    :class="[
                      'd-flex flex-row  my-3 align-center',
                      item.IsUserSend ? 'justify-end' : null,
                    ]"
                  >
                    <div
                      v-if="item.IsUserSend"
                      :class="[
                        ' mr-2 rounded-lg pa-2 msg-width',
                        item.MessageType === 'text' ? 'bg-amber-lighten-4' : '',
                      ]"
                    >
                      <v-row v-if="item.MessageType === 'text'">
                        <v-col cols="12 " class="pa-0 px-3 pt-2"
                          ><p class="grey-lighten-4 text-right text">
                            {{ item.Content }}
                          </p></v-col
                        >
                        <v-col
                          cols="12"
                          class="px-3 pb-2 pa-0 d-flex justify-space-between align-center text"
                        >
                          <div>
                            <v-icon color="grey-darken-1" v-if="item.loading">mdi-check</v-icon>
                            <v-icon color="red" v-if="item.error">mdi-alert-circle</v-icon>
                            <v-icon
                              :color="item.Seen ? 'blue-accent-3' : 'grey-darken-1'"
                              v-if="!item.loading && !item.error"
                              >mdi-check-all</v-icon
                            >
                          </div>
                          <div>
                            <p class="text-grey-darken-1 text-subtitle">{{ item.date }} {{ item.time }}</p>
                          </div></v-col
                        >
                      </v-row>
                      <v-row v-if="item.MessageType === 'image'">
                        <v-row justify="center">
                          <v-dialog
                            width="500"
                            v-model="imgFullSize"
                            fullscreen
                            :scrim="false"
                            transition="dialog-bottom-transition"
                          >
                            <template v-slot:default="{ isActive }">
                              <v-card>
                                <v-card-actions style="background-color: black; height: 100vh">
                                  <v-img
                                    :src="fullSizePreviewImg"
                                    width="auto"
                                    cover
                                    class="rounded-lg"
                                  >
                                  </v-img>
                                  <v-btn
                                    icon="mdi-close"
                                    position="absolute"
                                    style="top: 10px"
                                    color="white"
                                    size="x-large"
                                    @click="isActive.value = false"
                                  ></v-btn>
                                </v-card-actions>
                              </v-card>
                            </template>
                          </v-dialog>
                        </v-row>
                        <div>
                          <v-img
                            :src="item.image"
                            :max-width="400"
                            :width="200"
                            @click="imgFullSizePreview(item.image)"
                            cover
                            class="rounded-t-lg"
                          >
                          </v-img>
                          <v-col
                            cols="12"
                            class="px-3 pa-0 d-flex justify-space-between align-center align-self-end text-subtitle bg-amber-lighten-4 rounded-b-lg"
                          >
                            <div>
                              <v-icon color="grey-darken-1" v-if="item.loading">mdi-check</v-icon>
                              <v-icon color="red" v-if="item.error">mdi-alert-circle</v-icon>
                              <v-icon
                                :color="item.Seen ? 'blue-accent-3' : 'grey-darken-1'"
                                v-if="!item.loading && !item.error"
                                >mdi-check-all</v-icon
                              >
                            </div>
                            <div>
                              <p class="text-grey-darken-1 text-subtitle">{{ item.date }} {{ item.time }}</p>
                            </div></v-col
                          >
                        </div>
                      </v-row>
                    </div>
                    <v-avatar
                      :color="item.IsUserSend ? 'amber-darken-4' : 'teal-accent-4'"
                      size="36"
                    >
                      <v-icon class="white--text" v-if="item.IsUserSend">mdi-account</v-icon>
                      <v-icon class="white--text" v-if="!item.IsUserSend">mdi-support</v-icon>
                    </v-avatar>
                    <div
                      v-if="!item.IsUserSend"
                      class="bg-teal-lighten-5 ml-2 rounded-lg pa-2 text msg-width"
                    >
                      <v-row v-if="item.MessageType === 'text'">
                        <v-col cols="12" class="pt-3 pa-0 text-right px-3"
                          ><p>{{ item.Content }}</p></v-col
                        >
                        <v-col cols="12" class="pb-2 pa-0 px-3"
                          ><p class="text-grey-darken-1 text-subtitle">{{ item.time }} {{ item.date }}</p></v-col
                        >
                      </v-row>
                      <v-row
                        v-if="item.MessageType === 'image'"
                        class="bg-teal-lighten-5 rounded-lg"
                      >
                        <v-row justify="center">
                          <v-dialog
                            width="500"
                            v-model="imgFullSize"
                            fullscreen
                            :scrim="false"
                            transition="dialog-bottom-transition"
                          >
                            <template v-slot:default="{ isActive }">
                              <v-card>
                                <v-card-actions style="background-color: black; height: 100vh">
                                  <v-img
                                    :src="fullSizePreviewImg"
                                    width="auto"
                                    cover
                                    class="rounded-lg"
                                  >
                                  </v-img>
                                  <v-btn
                                    icon="mdi-close"
                                    position="absolute"
                                    style="top: 10px"
                                    color="white"
                                    size="x-large"
                                    @click="isActive.value = false"
                                  ></v-btn>
                                </v-card-actions>
                              </v-card>
                            </template>
                          </v-dialog>
                        </v-row>
                        <div>
                          <v-img
                            :src="item.image"
                            :max-width="400"
                            :width="200"
                            @click="imgFullSizePreview(item.image)"
                            cover
                          >
                          </v-img>
                          <v-col
                            cols="12"
                            class="px-3 pa-0 d-flex justify-space-between align-center align-self-end text-subtitle"
                          >
                            <div>
                              <v-icon color="grey-darken-1" v-if="item.loading">mdi-check</v-icon>
                              <v-icon color="red" v-else-if="item.error">mdi-alert-circle</v-icon>
                              <v-icon
                                :color="item.Seen ? 'blue-accent-3' : 'grey-darken-1'"
                                v-else-if="!item.loading && !item.error"
                                >mdi-check-all</v-icon
                              >
                            </div>
                            <div>
                              <p class="text-grey-darken-1 text-subtitle">{{ item.date }} {{ item.time }}</p>
                            </div></v-col
                          >
                        </div>
                      </v-row>
                    </div>
                  </div>
                </v-col>
                <BaseLoadingAndError
                  class="mb-8 mx-auto"
                  :loading="loading"
                  :error="error"
                  v-if="error || loading"
                  :postData="false"
                  @reload="reloadHandler"
                />
              </v-row>

              <v-col
                class="bg-grey-lighten-4 pa-2 type-box mx-auto"
                lg="6"
                xl="6"
                md="8"
                cols="12"
                v-if="chatImg.length > 0"
              >
                <v-btn icon="mdi-close" position="absolute" @click="closePreview"></v-btn>
                <v-col cols="12" class="rounded-lg">
                  <p class="text-center text-error" v-if="imgInvalid">
                    عکس باید کمتر از ۱ مگابایت باشد
                  </p>
                  <v-img :src="imgSrc" :max-width="400" :width="200" class="mx-auto">
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular
                          color="grey-lighten-4"
                          indeterminate
                        ></v-progress-circular>
                      </div> </template
                  ></v-img>
                </v-col>
              </v-col>
              <v-container class="align-center py-2 msg-field" >
                <v-row class="bg-white align-center" style="height: 4rem" no-gutters>
                  <v-col lg="6" xl="6" md="8" cols="12" class="mx-auto pa-2">
                    <v-row no-gutters>
                      <v-col cols="10" >
                        <v-text-field
                          v-model="msg"
                          placeholder="پیام خود را بنویسید..."
                          @keypress.enter="send"
                          :hide-details="true"
                          color="teal-accent-4"
                          class="text"
                          :focused="false"
                        ></v-text-field
                      ></v-col>
                      <v-col cols="1" class="pa-0 d-flex">
                        <v-file-input
                          accept="image/png, image/jpeg,image/heic"
                          prepend-icon="mdi-camera"
                          :hide-details="true"
                          class="image-input text-teal-accent-4 d-flex justify-end"
                          :rules="rules"
                          v-model="chatImg"
                        ></v-file-input>
                      </v-col>
                      <v-col
                        cols="1"
                        class="pa-0 d-flex align-center justify-start ml-lg-n4 ml-xl-n4 ml-md-n4"
                      >
                        <v-btn icon size="large" @click="send"
                          ><v-icon color="teal-accent-4">mdi-send</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>

      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import heic2any from "heic2any";
import { useSupportMsg } from "~/store/supportMsg";
import nurseServices from "~/assets/img/icons/nurse.png";
export default {
  setup() {
    const loading = ref(false);
    const error = ref(false);
    const store = useSupportMsg();
    const chat = computed(() => {
      return store.getAllMessages;
    });
    const router = useRouter();
    const imgFullSize = ref(false);
    const fullSizePreviewImg = ref("");
    const imgSrc = ref("");
    const extractTime = (d) => {
      const hour = d.getHours();
      const minutes = String(d.getMinutes()).padStart(2, "0");
      const currentHour = `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      return currentHour;
    };
    const getTime = computed(() => {
      return extractTime(new Date());
    });
    const getPersianDate = (date) => {
      const d = date.toLocaleDateString("fa-IR");
      const persianDate = useToEnglishDigits(d);
      return persianDate;
    };

    const chatImg = ref([]);
    const imgInvalid = ref(false);
    const msg = ref(null);
    const rules = computed(() => [
      (value) => {
        if (value[0]?.size > 1000000) {
          imgInvalid.value = true;
          return false;
        }
        imgInvalid.value = false;
        return true;
      },
    ]);
    const getImageUrl = async () => {
      if (chatImg.value.length > 0 && !imgInvalid.value) {
        const reader = new FileReader();
        reader.onload = (event) => {
          imgSrc.value = reader.result;
        };
        if (chatImg.value[0].type === "image/heic") {
          try {
            const result = await heic2any({ blob: chatImg.value[0] });
            reader.readAsDataURL(result);
          } catch (error) {
            console.error("Error converting image:", error);
          }
        } else {
          reader.readAsDataURL(chatImg.value[0]);
        }
      }
    };
    watch(chatImg, (newVal) => {
      if (newVal) {
        getImageUrl();
      }
    });
    const send = async () => {
     
      const formData = new FormData();
      let sendedMessage = {};
      if (msg.value) {
     
        sendedMessage = {
          Content: msg.value,
          IsUserSend: true,
          time: getTime.value,
          date: getPersianDate(new Date()),
          loading: ref(true),
          error: ref(false),
          Seen: false,
          MessageType: "text",
        };
        chat.value.push(sendedMessage);
        formData.append("Content", msg.value);
        formData.append("MessageType", "text");
        formData.append("File", "");
        msg.value = null;
        window.scrollTo({ top: 1000, behavior: "smooth" });
   
      } else if (chatImg.value.length > 0 && !imgInvalid.value) {
       
        msg.value = null;
        sendedMessage = {
          Content: msg.value,
          image: imgSrc.value,
          IsUserSend: true,
          time: getTime.value,
          date: getPersianDate(new Date()),
          loading: ref(true),
          error: ref(false),
          Seen: false,
          MessageType: "image",
        };
        chat.value.push(sendedMessage);
        formData.append("Content", null);
        formData.append("MessageType", "image");
        if (chatImg.value[0].type === "image/heic") {
          const result = await heic2any({ blob: chatImg.value[0] });
          const imageName = chatImg.value[0].name.replace("HEIC", "jpeg");
          var file = new File([result], imageName, { type: "image/jpeg" });
          formData.append("File", file);
        } else {
          console.log(chatImg.value[0]);
          formData.append("File", chatImg.value[0]);
        }
        chatImg.value = [];
        window.scrollTo({ top: 1000, behavior: "smooth" });
      } else {
        return;
      }
      try {
        const data = await useMyFetch(
          "/Message/send",
          sendedMessage.loading,
          sendedMessage.error,
          "post",
          "",
          formData
        );
        console.log(data);
      } catch (error) {
        error = true;
        console.error("Error fetching data:", error);
      }
    };
    const closePreview = () => {
      chatImg.value = [];
    };
    const imgFullSizePreview = (image) => {
      imgFullSize.value = true;
      fullSizePreviewImg.value = image;
    };
    const fetchData = () => {
      store.getSupportMessages(loading, error);
    };
    const reloadHandler = () => {
      error.value = false;
      loading.value = false;
      fetchData();
    };
    fetchData();
    const routBackHandler = () => {
      router.push("/support");
    };
    return {
      chat,
      msg,
      send,
      loading,
      error,
      getTime,
      rules,
      chatImg,
      imgSrc,
      imgInvalid,
      closePreview,
      imgFullSize,
      imgFullSizePreview,
      fullSizePreviewImg,
      nurseServices,
      reloadHandler,
      routBackHandler,
    };
  },
};
</script>
<style></style>
