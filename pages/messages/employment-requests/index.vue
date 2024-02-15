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
          :postData="false"
          v-if="error || loading"
          @reload="reloadHandler"
        />
        <MessagesBaseNoMessageAlert v-if="employmentRequests <= 0" />
        <MessagesEmploymentRequestsCard
          v-else
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
    //backward button
    const routBackHandler = () => {
      router.push("/messages");
    };
    //make a request for getting user's employment requests
    const getUserEmploymentRequests = async () => {
      try {
        const data = await useMyFetch("/User/nurse", loading, error, "getWithToken");
        employmentRequests.value = data;
      } catch (error) {
        error.value = true;
        console.error("Error fetching data:", error);
      }
    };
    //error alert reload button
    const reloadHandler = () => {
      error.value = false;
      loading.value = false;
      getUserEmploymentRequests();
    };
    onMounted(() => {
      getUserEmploymentRequests();
    });
    return {
      loading,
      error,
      routBackHandler,
      employmentRequests,
      reloadHandler,
    };
  },
};
</script>
