<template>
  <v-layout>
    <v-main>
      <v-container>
        <v-list class="text-right text-grey-darken-2 font-weight-bold" style="font-size: 14px">
          <v-list-item>
            تماس با پشتیبانی:
            <span class="text-teal-accent-4">۳۲۴۰۶۷۰۵-۰۲۶</span>
            <v-icon icon="mdi-phone" color="teal-accent-4" class="ml-3"></v-icon>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            چت آنلاین:
            <span class="text-teal-accent-4">(پاسخ سریع)</span>
            <v-icon icon="mdi-message" color="teal-accent-4" class="ml-3"></v-icon>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script>
export default {
  setup() {
    definePageMeta({
      layout: 'main',
    });
  },
};
</script>
