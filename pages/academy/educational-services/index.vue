<template>
  <div>
    <VApp>
      <pageBaseLayout
        title="خدمات آموزشی"
        :subPagesMode="true"
        @baseRouteBackHandler="routBackHandler"
      >
        <v-container class="educational-services">
          <v-row>
            <v-col
              cols="6"
              v-for="item in educationServices.ClassCategories"
              :key="item.Id"
              class="pa-1 py-2"
            >
              <NuxtLink :to="`educational-services/${item.route}`">
                <v-card color="teal-accent-4">
                  <p class="text-title text-center font-weight-bold">
                    {{ item.Title }}
                  </p>
                </v-card>
              </NuxtLink>
            </v-col>
          </v-row>
        </v-container>
      </pageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import pageBaseLayout from "~/components/pageBaseLayout.vue";

export default {
  components: { pageBaseLayout },
  setup() {
    const router = useRouter();
    const educationServices = ref([]);

    const routBackHandler = () => {
      router.push("/academy");
    };

    const getClassesData = async () => {
      const local = localStorage.getItem("academy");
      if (!local) {
        router.push("/academy");
      } else {
        const localStorageData = JSON.parse(local)
        const educationalServicesArray = localStorageData.find((item) => {
          return (item.id = "b62d9525-061c-4abc-5343-08db7bc9dafa");
        });
        educationServices.value = educationalServicesArray;
      }
    };
    onMounted(() => {
      getClassesData();
    });
    return {
      routBackHandler,
      educationServices,
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
