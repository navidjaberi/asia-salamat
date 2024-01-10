<template>
  <VApp>
    <GlobalPageBaseLayout
      :title="classDetailsData.Title"
      formClass="personal-info"
      :bottomBtn="true"
      @baseRouteBackHandler="routBackHandler"
      @baseSubmit="submit"
    >
      <AcademyClassesDetailCard
        :totalHours="classDetailsData.TotallHours"
        :timeHolding="classDetailsData.TimeHolding"
        :price="classDetailsData.Price"
        :prePaid="classDetailsData.PrePaid"
        :installmentNumber="classDetailsData.InstallmentNumber"
        :installmentPrice="classDetailsData.InstallmentPrice"
      />
    </GlobalPageBaseLayout>
  </VApp>
</template>
<script>
import { useAcademyClassesDetail } from "~/store/academyClassesDetail";
export default {
  props: {
    routeKeyword: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const routes = useRoute();
    const classDetailsData = computed(() => {
      return store.classesDetailData;
    });
    const store=useAcademyClassesDetail()
    const getRoute = uesGetRoute(routes.fullPath, props.routeKeyword);
    const routeTitle = ref(getRoute.replace("/details", ""));
    const routBackHandler = () => {
      router.push(`/academy/${props.routeKeyword + routeTitle.value}`);
    };
    const submit = () => {
      router.push(`/academy/${props.routeKeyword + routeTitle.value}/personal-info`);
    };
    onMounted(() => {
      store.getAcademyClassesDetail(routeTitle.value);
    });
    return {
      routBackHandler,
      submit,
      classDetailsData,
    };
  },
};
</script>
