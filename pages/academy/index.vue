<template>
  <div>
    <VApp>
      <pageBaseLayout title="آموزشگاه" :subPagesMode="true" @baseRouteBackHandler="routBackHandler">
        <div class="text-center mt-4">
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="teal-accent-4"
          ></v-progress-circular>
        </div>
        <v-col class="pa-0 d-flex flex-wrap">
          <v-col cols="6" v-for="item in academyMenu" :key="item.Id" class="pa-2">
            <NuxtLink :to="item.link">
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
                <p class="text-center font-weight-bold my-3" style="font-size: 0.9rem">
                  {{ item.Title }}
                </p>
              </v-card>
            </NuxtLink>
          </v-col>
        </v-col>
      </pageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import pageBaseLayout from "~/components/pageBaseLayout.vue";
import { useAcademyStore } from "~/store/academy";
export default {
  components: { pageBaseLayout },
  setup() {
    const router = useRouter();
    const store=useAcademyStore()
    const academyMenu = computed(()=>{
      return store.academyData});

    const loading = ref(false);
    const routBackHandler = () => {
      router.push("/home");
    };
    onMounted(() => {
      store.getAcademyData(loading)
    });

    return {
      routBackHandler,
      academyMenu,
      loading,
    };
  },
};
</script>
<style></style>
