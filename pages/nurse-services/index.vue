<template>
  <div>
    <VApp>
      <pageBaseLayout
        title="خدمات پرستاری"
        :subPagesMode="true"
        @baseRouteBackHandler="routBackHandler"
      >
        <v-col v-for="i in nurseServicesMenu" :key="i">
          <NuxtLink :to="i.link">
            <v-card class="mx-auto mt-4" link rounded elevated style="width: 100%">
              <v-img :src="i.img" cover class="mx-auto" :alt="i.title">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <p class="text-center font-weight-bold my-3">
                {{ i.title }}
              </p>
            </v-card>
          </NuxtLink>
        </v-col>
      </pageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import pageBaseLayout from "~/components/pageBaseLayout.vue";
import nurseChild from "~/assets/img/pics/nurse-child.png";
import nurseElderly from "~/assets/img/pics/elderly-nurse.png";
import nurseSick from "~/assets/img/pics/sick-nurse.jpg";
export default {
  components: { pageBaseLayout },
  setup() {
    const router = useRouter();
    const nurseServicesMenu = ref([
      { title: "پرستار کودک", img: nurseChild, link: "nurse-services/child-nursing" },
      { title: "پرستار سالمند", img: nurseElderly, link: "nurse-services/elder-nursing" },
      { title: "پرستار بیمار", img: nurseSick, link: "nurse-services/sick-nursing" },
    ]);
    const routBackHandler = () => {
      router.push("/home");
    };
    return {
      nurseServicesMenu,
      routBackHandler,
    };
  },
};
</script>
