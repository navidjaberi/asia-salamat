<template>
    <div>
      <VApp>
        <pageBaseLayout
          title="بهداشت و ایمنی"
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
export default{
    components: { pageBaseLayout },
setup(){
    const router = useRouter();
    const routBackHandler = () => {
      router.push("/academy");
    };
    return{
        routBackHandler,
    }
}
}
</script>