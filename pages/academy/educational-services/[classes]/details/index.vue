<template>
  <VApp>
    <pageBaseLayout
      :title="classDetailsData.Title"
      formClass="personal-info"
      :bottomBtn="true"
      @baseRouteBackHandler="routBackHandler"
      @baseSubmit="submit"
    >
      <classesDetail
        :totalHours="classDetailsData.TotallHours"
        :timeHolding="classDetailsData.TimeHolding"
        :price="classDetailsData.Price"
        :prePaid="classDetailsData.PrePaid"
        :installmentNumber="classDetailsData.InstallmentNumber"
        :installmentPrice="classDetailsData.InstallmentPrice"
      />
    </pageBaseLayout>
  </VApp>
</template>
<script>
import classesDetailCard from "~/components/academy/classesDetailCard.vue";
import pageBaseLayout from "~/components/pageBaseLayout.vue";
export default {
  components: { classesDetail: classesDetailCard, pageBaseLayout },
  setup() {
    const router = useRouter();
    const routes = useRoute();
    const classDetails = ref([]);
    const classDetailsData = ref({});
    const routeKeyword = "educational-services/";
    const getRoute = extractPathAfterKeyword(routes.fullPath, routeKeyword);
    const getClassesData = async () => {
  
      const local = localStorage.getItem("academy");
      if (!local) {
        router.push("/academy");
      } else {
        const localStorageData = JSON.parse(local);
        const classDetailsArray = localStorageData.find((item) => {
          return (item.id = "b62d9525-061c-4abc-5343-08db7bc9dafa");
        });
        classDetails.value = classDetailsArray.ClassCategories;
        const findClass = classDetails.value.find((item) => {
          return item.route === getRoute
        });
        classDetailsData.value = findClass;
      }
    };
    function extractPathAfterKeyword(url, keyword) {
      const keywordIndex = url.indexOf(keyword);
      if (keywordIndex !== -1) {
        return url.slice(keywordIndex + keyword.length).replace("/details", "");
      } else {
        return null;
      }
    }
    const routBackHandler = () => {
      router.push(`/academy/educational-services/${getRoute}`);
    };
    const submit = () => { router.push(`/academy/educational-services/${getRoute}/personal-info`)}
    onMounted(() => {
      getClassesData();
    });
    return {
      routBackHandler,
      submit,
      classDetailsData,
    };
  },
};
</script>
