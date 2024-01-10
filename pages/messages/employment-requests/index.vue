<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="درخواست های استخدام"
        :subPagesMode="true"
        @baseRouteBackHandler="routBackHandler"
      >
        <BaseLoadingAndError
          class="mt-8"
          :loading="loading"
          :error="error"
          v-if="error || loading"
        />
        <MessagesEmploymentRequestsCard
          v-for="i in employmentRequests"
          :key="i"
          :name="i.Name"
          :date="i.UpdatedAt"
          :status="i.status"
          :shifts="i.Shifts"
        />
      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script>
export default {
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const error = ref(false);
    const employmentRequests = ref([]);
    const routBackHandler = () => {
      router.push("/messages");
    };
    const getUserEmploymentRequests = async () => {
      try {
        const data = await useMyFetch("/User/nurse", loading, error, "getWithToken");
        employmentRequests.value = data;
      } catch (error) {
        error.value = true;
        console.error("Error fetching data:", error);
      }
    };
    onMounted(() => {
      getUserEmploymentRequests();
    });
    return {
      loading,
      error,
      routBackHandler,
      employmentRequests,
    };
  },
};
</script>
