<template>
  <VApp>
    <pageBaseLayout
      :title="classDetailsData.Title"
      formClass="personal-info"
      :firstIndex="true"
      :bottomBtn="true"
      @baseRouteBackHandler="routBackHandler"
      @baseSubmit="submit"
    >
      <CLassesCard
        :evenDays="evenDaysClass"
        :oddDays="oddDaysClass"
        :hours="classDetailsData.Hours"
      />
    </pageBaseLayout>
  </VApp>
</template>
<script>
import classesTimeCard from "~/components/academy/classesTimeCard.vue";
import pageBaseLayout from "~/components/pageBaseLayout.vue";
export default {
  components: { CLassesCard: classesTimeCard, pageBaseLayout },
  setup() {
    const router = useRouter();
    const routes = useRoute();
    const classDetails = ref([]);
    const classDetailsData = ref({});
    const routeKeyword = "educational-services/"
    const getRoute = extractPathAfterKeyword(routes.fullPath, routeKeyword);
    const evenDaysClass = computed(() => {
      if (classDetailsData.value.Days === "روزهای زوج,روزهای فرد") {
        return true;
      } else if (classDetailsData.value.Days === "روزهای زوج") {
        return true;
      } else {
        return false;
      }
    });
    const oddDaysClass = computed(() => {
      if (classDetailsData.value.Days === "روزهای زوج,روزهای فرد") {
        return true;
      } else if (classDetailsData.value.Days === ",روزهای فرد") {
        return true;
      } else {
        return false;
      }
    });
    const hours = computed(() => {
      console.log(classDetailsData.value.Hours);
      return classDetailsData.value.Hours;
    });
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
          return item.route === getRoute;
        });
        classDetailsData.value = findClass;
      }
    };
    function extractPathAfterKeyword(url, keyword) {
      const keywordIndex = url.indexOf(keyword);
      if (keywordIndex !== -1) {
        return url.slice(keywordIndex + keyword.length);
      } else {
        return null;
      }
    }
    const routBackHandler = () => {
      router.push("/academy/educational-services");
    };
    const submit = () => {
      router.push(`/academy/educational-services/${getRoute}/details`);
    };
    onMounted(() => {
      getClassesData();
    });
    return {
      routBackHandler,
      submit,
      routes,
      classDetailsData,
      evenDaysClass,
      oddDaysClass,
      hours,
    };
  },
};
</script>
