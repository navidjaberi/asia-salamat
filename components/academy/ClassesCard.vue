<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        :title="classCategoryTitle"
        :subPagesMode="true"
        @baseRouteBackHandler="routBackHandler"
      >
        <BaseLoadingAndError
          :loading="loading"
          :error="error"
          :postData="false"
          @reload="reloadHandler"
        />
        <v-container class="educational-services">
          <v-row>
            <v-col cols="6" v-for="item in educationServices" :key="item.Id" class="pa-1 py-2">
              <NuxtLink :to="`/academy/${routeKeyword + item.route}`">
                <v-card color="teal-accent-4">
                  <p class="text-title text-center ">
                    {{ item.Title }}
                  </p>
                </v-card>
              </NuxtLink>
            </v-col>
          </v-row>
        </v-container>
      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script lang="ts">
import { useAcademyClasses } from "~/store/academyClasses";
export default {
  props: {
    classCategoryTitle: {
      type: String,
      required: true,
    },
    routeKeyword: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useAcademyClasses();
    // Computed property to get education services from the store

    const educationServices = computed(() => {
      return store.classesData;
    });
    const loading = ref(false);
    const error = ref(false);
    const routBackHandler = () :void => {
      router.push("/academy");
    };
    // Fetch academy data from the store
    const getAcademyData = () => {
      store.getAcademyClasses(props.classCategoryTitle, loading, error);
    };
    // Handler to reload data after an error
    const reloadHandler = () => {
      error.value = false;
      loading.value = false;
      getAcademyData();
    };
    // Fetch academy data on component mount
    onMounted(() => {
      getAcademyData();
    });
    return {
      routBackHandler,
      educationServices,
      loading,
      error,
      reloadHandler,
    };
  },
};
</script>
<style>
.educational-services {
  .v-card {
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
