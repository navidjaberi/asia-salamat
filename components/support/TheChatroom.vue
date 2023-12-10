<template>
  <v-container fluid class="chat-box pa-2">
    <v-container>
      <v-row>
        <v-col class="mb-13 pa-0">
          <div
            v-for="(item, index) in chat"
            :key="index"
            :class="[
              'd-flex flex-row  my-3 align-center',
              item.from == 'user' ? 'justify-end' : null,
            ]"
          >
            <div
              v-if="item.from === 'user'"
              :class="[' mr-2 rounded-lg pa-2 msg-width', item.msg ? 'bg-amber-lighten-4' : '']"
            >
              <v-row v-if="item.msg">
                <v-col cols="12 " class="pa-0 px-3 pt-2"
                  ><p class="grey-lighten-4 text-right text">
                    {{ item.msg }}
                  </p></v-col
                >
                <v-col
                  cols="12"
                  class="px-3 pb-2 pa-0 d-flex justify-space-between align-center"
                  style="font-size: 0.7rem"
                >
                  <div><v-icon color="grey-darken-1">mdi-check-all</v-icon></div>
                  <div>
                    <p class="text-grey-darken-1">{{ item.time }}</p>
                  </div></v-col
                >
              </v-row>
              <v-row v-if="item.img">
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
                          <v-img :src="item.img" width="auto" cover class="rounded-lg"> </v-img>
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
                <v-img
                  :src="item.img"
                  :max-width="400"
                  :width="200"
                  @click="imgFullSize = true"
                  cover
                  class="rounded-lg"
                >
                </v-img>
              </v-row>
            </div>
            <v-avatar :color="item.from == 'user' ? 'amber-darken-4' : 'teal-accent-4'" size="36">
              <v-icon class="white--text" v-if="item.from == 'user'">mdi-account</v-icon>
              <v-icon class="white--text" v-if="item.from == 'support'">mdi-support</v-icon>
            </v-avatar>
            <div
              v-if="item.from != 'user'"
              class="bg-teal-lighten-5 ml-2 rounded-lg pa-2 text msg-width"
            >
              <v-row>
                <v-col cols="12" class="pt-3 pa-0 text-right px-3"
                  ><p>{{ item.msg }}</p></v-col
                >
                <v-col cols="12" class="pb-2 pa-0 px-3"
                  ><p class="text-grey-darken-1">{{ currentHour }}</p></v-col
                >
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="type-box">
      <v-row class="bg-grey-lighten-4 pa-2" v-if="chatImg.length > 0">
        <v-btn icon="mdi-close" position="absolute" @click="closePreview"></v-btn>
        <v-col cols="12" class="rounded-lg">
          <p class="text-center text-error" v-if="imgInvalid">عکس باید کمتر از ۱۰ مگابایت باشد</p>
          <v-img :src="getImageUrl" :max-width="400" :width="200" class="mx-auto">
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
              </div> </template
          ></v-img>
        </v-col>
      </v-row>
      <v-row class="align-center py-2" no-gutters>
        <v-col cols="10" class="pa-0">
          <v-text-field
            v-model="msg"
            placeholder="پیام خود را بنویسید..."
            @keypress.enter="send"
            :hide-details="true"
            color="teal-accent-4"
            style="font-size: 0.8rem"
          ></v-text-field
        ></v-col>
        <v-col cols="1" class="pa-0">
          <v-file-input
            accept="image/png, image/jpeg, image/bmp, image/tiff"
            prepend-icon="mdi-camera"
            :hide-details="true"
            class="image-input text-teal-accent-4 d-flex justify-end"
            :rules="rules"
            v-model="chatImg"
          ></v-file-input>
        </v-col>
        <v-col cols="1" class="pa-0">
          <v-btn icon size="large" @click="send" class="ml-2"
            ><v-icon color="teal-accent-4">mdi-send</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
export default {
  setup() {
    const imgFullSize = ref(false);
    const chatImg = ref([]);
    const d = new Date();
    const hour = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const currentHour = ref(hour + ":" + minutes);
    const chat = ref([
      { from: "support", msg: "سلام چجوری میتونم کمکتون کنم؟", time: currentHour.value, img: "" },
    ]);
    const imgInvalid = ref(false);
    const msg = ref(null);
    const rules = computed(() => [
      (value) => {
        if (value[0]?.size > 10000000) {
          imgInvalid.value = true;
          return false;
        }
        imgInvalid.value = false;
        return true;
      },
    ]);
    const getImageUrl = computed(() => {
      if (chatImg.value.length > 0 && !imgInvalid.value) {
        return URL.createObjectURL(chatImg.value[0]);
      }
      return null;
    });
    const send = async () => {
      if (msg.value) {
        chatImg.value = [];
        chat.value.push({
          from: "user",
          msg: msg.value,
          time: currentHour.value,
        });
        msg.value = null;
        chatImg.value = [];
      } else if (chatImg.value.length > 0 && !imgInvalid.value) {
        msg.value = null;
        chat.value.push({ from: "user", img: getImageUrl.value, time: currentHour.value });
        chatImg.value = [];
      } else {
        return;
      }
      setTimeout(() => {
        addReply();
      }, 3000);
    };
    const addReply = () => {
      chat.value.push({
        from: "support",
        msg: "سلام",
      });
    };
    const closePreview = () => {
      chatImg.value = [];
    };
    return {
      chat,
      msg,
      send,
      addReply,
      currentHour,
      rules,
      chatImg,
      getImageUrl,
      imgInvalid,
      closePreview,
      imgFullSize,
    };
  },
};
</script>
<style></style>
