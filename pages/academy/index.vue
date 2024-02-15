<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="آموزشگاه"
        :subPagesMode="true"
        @baseRouteBackHandler="routBackHandler"
      >
        <BaseLoadingAndError
          :loading="loading"
          :error="error"
          :postData="false"
          @reload="reloadHandler"
        />
        <v-snackbar
          :timeout="2000"
          color="teal-accent-4"
          rounded="pill"
          location="top"
          v-model="openAlert"
        >
          <template v-slot:activator="{ props }"> </template>
          <p class="text text-center">کلاس مورد نظر به زودی به لیست کلاس ها اضافه خواهد شد</p>
        </v-snackbar>
        <v-col class="pa-0 d-flex flex-wrap">
          <v-col
            cols="6"
            xxl="2"
            xl="2"
            lg="3"
            md="3"
            v-for="item in academyMenu"
            :key="item.Id"
            class="pa-2"
          >
            <NuxtLink :to="!item.disable ? item.link : ''" @click="disableAlert(item)">
              <v-card class="mx-auto mt-4" link rounded elevated>
                <v-img :src="item.image" class="mx-auto" :alt="item.Title" aspect-ratio="1" cover>
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular
                        indeterminate
                        color="grey-lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                  <template v-slot:error>
                    <v-img
                      class="mx-auto"
                      height="300"
                      max-width="500"
                      src="https://picsum.photos/500/300?image=232"
                    ></v-img>
                  </template>
                </v-img>
                <p class="text-center  my-3" style="font-size: 0.7rem">
                  {{ item.Title }}
                </p>
              </v-card>
            </NuxtLink>
          </v-col>
        </v-col>
      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import { useAcademyStore } from "~/store/academy";
export default {
  setup() {
    const router = useRouter();
    const store = useAcademyStore();
    const openAlert = ref(false);
    //get academy data from store
    const academyMenu = computed(() => {
      return store.academyData;
    });
    const loading = ref(false);
    const error = ref(false);
    //show an coming soon alert for disable classes
    const disableAlert = (i) => {
      if (i.disable) {
        openAlert.value = true;
      }
    };
   //run a func from store to get academy data 
    const getAcademyData = () => {
      store.getAcademyData(loading, error);
    };
    //
    const reloadHandler = () => {
      error.value = false;
      loading.value = false;
      getAcademyData();
    };
    const routBackHandler = () => {
      router.push("/home");
    };
    onMounted(() => {
      getAcademyData();
    });
    return {
      routBackHandler,
      academyMenu,
      loading,
      openAlert,
      disableAlert,
      error,
      reloadHandler,
    };
  },
};
</script>
