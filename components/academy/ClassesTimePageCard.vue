<template>
  <VApp>
    <GlobalPageBaseLayout
      :title="classDetailsData.Title"
      formClass="personal-info"
      :firstIndex="true"
      :bottomBtn="true"
      @baseRouteBackHandler="routBackHandler"
      @baseSubmit="submit"
    >
      <BaseLoadingAndError :loading="loading" :error="error" :postData="false" />
      <AcademyClassesTimeCard
        :evenDays="evenDaysClass"
        :oddDays="oddDaysClass"
        :hours="classDetailsData.Hours"
        @getHour="reserveClassHour"
        @getDay="reserveClassDay"
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
    classCategoryTitle: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const routes = useRoute();
    const getUserId = useCookie("userId");
    const error = ref(false);
    const loading = ref(false);
    const classReserveData = ref({
      classCategoryId: "",
      userId: getUserId.value,
      day: "",
      hours: "",
    });
    const store = useAcademyClassesDetail();
    //get classes detail data from store
    const classDetailsData = computed(() => {
      return store.classesDetailData;
    });
    //get the page route keyword from parent component
    const routeKeyword = props.routeKeyword;
    //use routeKeyword to make pages full route path
    const routeTitle = ref(uesGetRoute(routes.fullPath, routeKeyword));
    //split the classes detail days for getting even days
    const evenDaysClass = computed(() => {
      if (classDetailsData.value.Days === "روزهای زوج,روزهای فرد") {
        return true;
      } else if (classDetailsData.value.Days === "روزهای زوج") {
        return true;
      } else {
        return false;
      }
    });
    //split the classes detail days for getting odd days
    const oddDaysClass = computed(() => {
      if (classDetailsData.value.Days === "روزهای زوج,روزهای فرد") {
        return true;
      } else if (classDetailsData.value.Days === ",روزهای فرد") {
        return true;
      } else {
        return false;
      }
    });
    //get the emitted hour value from child component
    const reserveClassHour = (hour) => {
      classReserveData.value.hours = hour;
    };
    //get the emitted day value from child component
    const reserveClassDay = (day) => {
      classReserveData.value.day = day;
    };
    //get the classes hour
    const hours = computed(() => {
      return classDetailsData.value.Hours;
    });
    //backward button
    const routBackHandler = () => {
      router.push(`/academy/${props.routeKeyword}`);
    };
    const submit = () => {
      //set a timeout for waiting for data to arrive
      loading.value = true;
      setTimeout(() => {
        classReserveData.value.classCategoryId = classDetailsData.value.Id;
        localStorage.setItem(routeTitle.value, JSON.stringify(classReserveData.value));
        router.push(`/academy/${props.routeKeyword + routeTitle.value}/details`);
      }, 2100);
    };
    onBeforeMount(() => {
      store.getAcademyClassesDetail(routeTitle.value, props.routeKeyword);
    });
    return {
      routBackHandler,
      error,
      loading,
      submit,
      routes,
      classDetailsData,
      evenDaysClass,
      oddDaysClass,
      hours,
      reserveClassHour,
      reserveClassDay,
    };
  },
};
</script>
