<template>
  <v-app-bar color="grey-lighten-5" elevation="1">
    <v-app-bar-nav-icon variant="text" style="position: absolute">
      <v-btn prepend-icon="mdi-arrow-left" block @click="baseRouteBackHandler">
        <template v-slot:prepend>
          <v-icon></v-icon>
        </template> </v-btn
    ></v-app-bar-nav-icon>
    <v-col cols="8" class="mx-auto">
      <p class="text-center font-weight-bold">{{ title }}</p></v-col
    >
  </v-app-bar>
  <v-main>
    <slot v-if="subPagesMode" />

    <v-form class="px-4 mt-6" :class="formClass" @submit.prevent="baseSubmit" ref="formRef" v-if="!subPagesMode">
      <slot v-if="!subPagesMode" />
      <v-row :class="[ bottomBtn ? 'btn-row' : 'my-2 ']">
        <v-col>
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
        <v-col>
          <v-btn append-icon="mdi-arrow-right" class="bg-teal-lighten-5" type="submit" block>
            مرحله بعد

            <template v-slot:append>
              <v-icon color="teal-accent-4"></v-icon>
            </template>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-main>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
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
    subPagesMode:{
      type: Boolean,
      required: false,
    }
  },
  emits: ["baseRouteBackHandler", "baseSubmit"],
  setup(props, context) {
    const formRef = ref(null);
    const baseRouteBackHandler = () => {
      context.emit("baseRouteBackHandler");
    };
    const baseSubmit = async () => {
      const { valid } = await formRef.value.validate();
      context.emit("baseSubmit", valid);
    };
    return { baseRouteBackHandler, baseSubmit, formRef };
  },
};
</script>
