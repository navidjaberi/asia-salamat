<template>
  <v-dialog transition="dialog-bottom-transition" width="auto" v-model="openModal">
    <template v-slot:default="{ isActive }">
      <v-card class="rounded-xl">
        <v-toolbar color="teal-accent-4"
          ><p class="text-center text-title  pa-5">
            نحوه پرداخت خود را انتخاب کنید
          </p></v-toolbar
        >
        <v-card-text>
          <v-row>
            <v-card link class="elevation-0 w-50" @click="installmentPurchasePay"
              ><v-img :width="100" :height="120" class="mx-auto" :src="installmentPurchase"></v-img>
              <p class="text  text-center">پرداخت اقساطی<br />(آنلاین)</p>
            </v-card>
            <v-divider vertical></v-divider>
            <v-card link class="elevation-0 w-50" @click="cashPurchasePay"
              ><v-img :width="160" :height="120" :src="cashPurchase"></v-img>
              <p class="text  text-center">پرداخت نقدی <br />(آنلاین)</p></v-card
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
    const installmentPurchasePay = () => {
      emit("installmentPurchasePay");
    };
    const cashPurchasePay = () => {
      emit("cashPurchasePay");
    };
    return {
      installmentPurchasePay,
      cashPurchasePay,
      installmentPurchase,
      cashPurchase,
      openModal,
    };
  },
};
</script>
