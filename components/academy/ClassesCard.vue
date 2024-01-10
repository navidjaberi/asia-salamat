<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        :title="classCategoryTitle"
        :subPagesMode="true"
        @baseRouteBackHandler="routBackHandler"
      >
       <BaseLoadingAndError :loading="loading" :error="error"/>
        <v-container class="educational-services">
          <v-row>
            <v-col cols="6" v-for="item in educationServices" :key="item.Id" class="pa-1 py-2">
              <NuxtLink :to='`/academy/${routeKeyword + item.route}`'>
              <v-card color="teal-accent-4">
                <p class="text-title text-center font-weight-bold">
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
<script>
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
    const educationServices = computed(() => {
      return store.classesData;
    });
    const loading = ref(false);
    const error = ref(false);
    const routBackHandler = () => {
      router.push("/academy");
    };
    onMounted(() => {
      store.getAcademyClasses(props.classCategoryTitle, loading, error);
    });
    return {
      routBackHandler,
      educationServices,
      loading,
      error,
     
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
