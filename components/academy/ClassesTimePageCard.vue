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
      <AcademyClassesTimeCard
        :evenDays="evenDaysClass"
        :oddDays="oddDaysClass"
        :hours="classDetailsData.Hours"
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
        const classDetailsData = computed(() => {
            return store.classesDetailData;
        });
        const store = useAcademyClassesDetail();
        const routeKeyword = props.routeKeyword;
        const routeTitle = ref(uesGetRoute(routes.fullPath, routeKeyword));
        const evenDaysClass = computed(() => {
            if (classDetailsData.value.Days === "روزهای زوج,روزهای فرد") {
                return true;
            }
            else if (classDetailsData.value.Days === "روزهای زوج") {
                return true;
            }
            else {
                return false;
            }
        });
        const oddDaysClass = computed(() => {
            if (classDetailsData.value.Days === "روزهای زوج,روزهای فرد") {
                return true;
            }
            else if (classDetailsData.value.Days === ",روزهای فرد") {
                return true;
            }
            else {
                return false;
            }
        });
        const hours = computed(() => {
            return classDetailsData.value.Hours;
        });
        const routBackHandler = () => {
            router.push(`/academy/${props.routeKeyword}`);
        };
        const submit = () => {
            router.push(`/academy/${props.routeKeyword + routeTitle.value}/details`);
        };
        onMounted(() => {
            store.getAcademyClassesDetail(routeTitle.value);
        });
        return {
            routBackHandler,
            submit,
            routes,
            classDetailsData,
            evenDaysClass,
            oddDaysClass,
            hours
        };
    },
   
};
</script>
