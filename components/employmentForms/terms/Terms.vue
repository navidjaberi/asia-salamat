<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="شرایط و قوانین"
        formClass="collaboration"
        :bottomBtn="true"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <BaseLoadingAndError :loading="loading" :error="postError" class="mb-3" :postData="true" />
        <v-container>
          <v-row>
            <v-col xxl="5" xl="6" lg="7" md="8" cols="12" class="pa-0 mx-auto">
              <v-row>
                <v-col>
                  <ol class="term-list">
                    <li>
                      اینجانب متعهد ميگردم راس ساعت قيد شده در محل كار ورود و خروج داشته باشم.
                    </li>
                    <li>
                      اینجانب متعهد ميگردم خارج از شرايط قرارداد خدمات ارائه ندهم چنانچه در صورت عدم
                      تعهدات شركت آسياسلامت مجاز به برخورد قانونی می باشد.
                    </li>
                    <li>
                      اینجانب متعهد ميگردم درخواست وام ، ضمانت ، حقوق بیشتر از طرف اول قرارداد (
                      کارفرما ) نداشته باشم .
                    </li>
                    <li>
                      اینجانب متعهد ميگردم در طول مدت ساعت كاری از محل كار بدون اطلاع به شركت خارج
                      نشوم .
                    </li>
                    <li>
                      اینجانب متعهد ميگردم در صورت درخواست مرخصی و يا ترک كار 72 ساعت قبل به شركت و
                      کارفرما اطلاع رسانی نمایم .
                    </li>
                    <li>
                      اینجانب متعهد ميگردم در صورت اتمام قرارداد محل كار را ترک نمایم و بدون قرارداد
                      شركت در آن مكان (قرارداد قيد شده) به فعالیت خود ادامه ندهم.
                    </li>
                    <li>اینجانب متعهد ميگردم پیشنهاد تبانی از سمت کارفرما، شركت را مطلع نمایم .</li>
                    <li>
                      اینجانب متعهد ميگردم بدون دستور پزشک و طرف اول قرارداد هيچ اقدام خود سرانه ای
                      انجام ندهم .
                    </li>
                    <li>اینجانب متعهد ميگردم در صورت بروز هر مشکلی شركت را مطلع نمایم .</li>
                    <li>
                      اینجانب تمام جزئيات فرم ثبت نام را مطالعه نموده و تمام اطلاعات را وارد شده را
                      به صورت واقعیت اعلام نموده .
                    </li>
                    <li>
                      اینجانب متعهد ميگردم تمام شرايط و قوانين شركت را انجام دهم در غير اين صورت در
                      برابر شركت هيج ادعا و شكايتی نيز نداشته و شركت میتواند با توجه به سنديات و
                      شواهد موجود نسبت به مدارک ضمانتی اینجانب از طريق مراجع ذيصالح اقدام نماید
                    </li>
                  </ol>
                </v-col>
              </v-row>

              <v-col class="d-flex justify-end align-center mb-8">
                <p class="text-title">شرايط را <span class="text-teal-accent-4">قبول</span> دارم</p>
                <v-checkbox
                  color="teal-accent-4"
                  :error="error"
                  class="term-checkbox"
                  hide-details
                  :rules="[(v) => !!v || 'You must agree to continue!']"
                >
                </v-checkbox>
              </v-col>
            </v-col>
          </v-row>
        </v-container>
      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script>
export default {
  setup() {
    const router = useRouter();
    const error = ref(false);
    const loading = ref(false);
    const postError = ref(false);
    const paymentUrl = ref("");
    //removing all forms data from local storage
    const removeLocalItem = () => {
      localStorage.removeItem("relativesInfo");
      localStorage.removeItem("employmentPersonalInfo");
      localStorage.removeItem("collaborationTerms");
      localStorage.removeItem("personalRecords");
      localStorage.removeItem("nurseImgNames");
      localStorage.removeItem("pdfNum");
    };
    //getting user ID from local storage for payment
    const getUserId = computed(() => {
      const getId = localStorage.getItem("nurseEmploymentId");
      return getId;
    });
    //make a request for getting the payment port Api
    const payment = async () => {
      try {
        const data = await useMyFetch(
          `/Nurse/payment?id=${getUserId.value}`,
          loading,
          postError,
          "getWithToken"
        );
        if (data) {
          paymentUrl.value = data;
        }
      } catch (err) {
        error.value = true;
        console.error("Error fetching data:", err);
      }
    };
    //submit and posting data
    const submit = (valid) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (valid) {
        // removeLocalItem();
        const newTab = window.open("", "_blank");
        setTimeout(() => {
          newTab.document.write("درحال انتقال به سایت پذیرنده");
          newTab.location.href = paymentUrl.value;
        }, 800);
        if (newTab == null) {
          error.value = true;
        } else {
          setTimeout(() => {
            router.push("/support-contact");
          }, 2000);
        }
      } else {
        error.value = true;
      }
    };
    const routBackHandler = () => {
      router.push("/employment/relatives-info");
    };
    onMounted(() => {
      payment();
    });
    return { submit, routBackHandler, error, postError, loading };
  },
};
</script>
