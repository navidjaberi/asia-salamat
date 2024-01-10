<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="لیست رزرو ها"
        :subPagesMode="true"
        @baseRouteBackHandler="routBackHandler"
      >
        <v-row no-gutters>
          <v-col>
            <v-tabs
              class="mr-9 d-flex align-center w-100 mt-n2"
              color="teal-accent-4"
              fixed-tabs
              centered
              stacked
              v-model="tab"
            >
              <v-tab class="tabs pa-8" value="two"
                ><v-icon>mdi-hospital-box</v-icon> پرستارها</v-tab
              >
              <v-tab class="tabs pa-8" value="one"><v-icon>mdi-school</v-icon>کلاس ها</v-tab>
            </v-tabs>
          </v-col>
        </v-row>
        <BaseLoadingAndError
          class="mt-8"
          :loading="loading"
          :error="error"
          v-if="error || loading"
        />
        <v-row no-gutters>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="two">
                <MessagesMyRequestsCard
                  v-for="i in reserved"
                  :key="i.Id"
                  mode="nurseReserved"
                  :category="i.NurseCategory"
                  :hours="i.Hours"
                  :shift="i.Shift"
                  :date="i.UpdatedAt"
                  :address="i.Address"
                  :gender="i.Gender"
                />
              </v-window-item>
              <v-window-item value="one">
                <MessagesMyRequestsCard
                  v-for="i in classes"
                  :key="i.Id"
                  mode="classReserved"
                  :title="i.ClassCategory.Title"
                  :price="i.ClassCategory.Price"
                  :hours="i.Hours"
                  :day="i.Day"
                  :installment="i.IsInstallment"
                />
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-row>
      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script>
export default {
  setup() {
    const router = useRouter();
    const tab = ref("one");
    const loading = ref(false);
    const error = ref(false);
    const classes = ref([]);
    const reserved = ref([]);
    const routBackHandler = () => {
      router.push("/messages");
    };
    const getUserRequests = async () => {
      try {
        const data = await useMyFetch("/User/get-reserved", loading, error, "getWithToken");
        reserved.value = data.ReserveNurses;
        classes.value = data.ReservedClasses;
      } catch (error) {
        error.value = true;
        console.error("Error fetching data:", error);
      }
    };
    onMounted(() => {
      getUserRequests();
    });
    return {
      routBackHandler,
      tab,
      loading,
      error,
      reserved,
      classes,
    };
  },
};
</script>
<style></style>
