<template>
  <v-app-bar color="grey-lighten-5" elevation="1" class="base-layout">
    <v-app-bar-nav-icon variant="text" class="nav-icon">
      <v-btn prepend-icon="mdi-arrow-left" block @click="baseRouteBackHandler">
        <template v-slot:prepend>
          <v-icon></v-icon>
        </template> </v-btn
    ></v-app-bar-nav-icon>
    <v-col cols="8" class="mx-auto">
      <p class="text-center  text-title">{{ title }}</p></v-col
    >
  </v-app-bar>
  <v-main :class='{"d-flex flex-column-reverse":messenger}'>
    <slot v-if="subPagesMode" />

    <v-form
      class="px-4 mt-6"
      :class="formClass"
      @submit.prevent="baseSubmit"
      ref="formRef"
      v-if="!subPagesMode"
    >
      <slot v-if="!subPagesMode" />
      <v-row :class="[bottomBtn ? 'btn-row' : 'my-5', 'base-layout']">
        <v-col cols="11" lg="7" md="8" xl="6" class="mx-auto pa-0">
          <v-row class="d-flex justify-space-between">
            <v-col cols="6" lg="3" xl="3" xxl="1" md="3">
              <v-btn
                v-if="!firstIndex"
                prepend-icon="mdi-arrow-left"
                class="bg-teal-lighten-5"
                block
                @click="baseRouteBackHandler"
              >
                مرحله قبل
                <template v-slot:prepend>
                  <v-icon color="teal-accent-4"></v-icon>
                </template>
              </v-btn>
            </v-col>
            <v-col cols="6" lg="3" xl="3" xxl="1" md="3">
              <v-btn append-icon="mdi-arrow-right" class="bg-teal-lighten-5" type="submit" block>
                مرحله بعد

                <template v-slot:append>
                  <v-icon color="teal-accent-4"></v-icon>
                </template>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-main>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: {
      required: true,
      type: String,
    },
    formClass: {
      type: String,
      required: false,
    },
    firstIndex: {
      type: Boolean,
      required: false,
    },
    bottomBtn: {
      type: Boolean,
      required: false,
    },
    subPagesMode: {
      type: Boolean,
      required: false,
    },
    messenger:{
      type:Boolean,
      required:false
    }
  },
  emits: ["baseRouteBackHandler", "baseSubmit"],
  setup(props, context) {
    const formRef = ref(null);
    //emit the back button
    const baseRouteBackHandler = () => {
      context.emit("baseRouteBackHandler");
    };
    //emit the next step button with the form valid ref as payload
    const baseSubmit = async () => {
      const { valid } = await formRef.value.validate();
      context.emit("baseSubmit", valid);
    };
    return { baseRouteBackHandler, baseSubmit, formRef };
  },
});
</script>
<style>
.base-layout {
  .nav-icon{
    position: absolute;
    left: 2px;
  }
  .v-btn__content {
    font-size: 0.6rem !important;
    
  }
}
</style>
