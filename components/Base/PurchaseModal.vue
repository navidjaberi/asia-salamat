<template>
  <v-dialog transition="dialog-bottom-transition" width="auto" v-model="openModal">
    <template v-slot:default="{ isActive }">
      <v-card class="rounded-xl">
        <v-toolbar color="teal-accent-4"
          ><p class="text-center text-title font-weight-bold pa-5">
            نحوه پرداخت خود را انتخاب کنید
          </p></v-toolbar
        >
        <v-card-text>
          <v-row>
            <NuxtLink to=""  class="w-50">
              <v-card link class="elevation-0"
                ><v-img
                  :width="100"
                  :height="120"
                  class="mx-auto"
                  :src="installmentPurchase"
                ></v-img>
                <p class="text font-weight-bold text-center">پرداخت اقساطی<br />(آنلاین)</p>
              </v-card></NuxtLink
            >
            <v-divider vertical></v-divider>
            <NuxtLink to="" class="w-50">
              <v-card link class="elevation-0"
                ><v-img :width="160" :height="120" :src="cashPurchase"></v-img>
                <p class="text font-weight-bold text-center">پرداخت نقدی <br />(آنلاین)</p></v-card
              ></NuxtLink
            >
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn variant="text" @click="isActive.value = false">بستن</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import installmentPurchase from "~/assets/img/pics/installment-purchase.png";
import cashPurchase from "~/assets/img/pics/cash-purchase.png";
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const openModal = computed({
      get() {
        return props.dialog;
      },
      set(newVal) {
        emit("update:dialog", newVal);
      },
    });
    const installmentPurchaseHandler = () => {
      console.log("object");
    };
    return {
      installmentPurchase,
      installmentPurchaseHandler,
      cashPurchase,
      openModal,
    };
  },
 
};
</script>
