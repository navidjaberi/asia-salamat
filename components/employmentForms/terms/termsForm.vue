<template>
  <div>
    <VApp>
      <pageBaseLayout
        title="شرایط و قوانین"
        formClass=""
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <v-container>
          <v-row>
            <v-col>
              <ol class="term-list">
                <li>اینجانب متعهد ميگردم راس ساعت قيد شده در محل كار ورود و خروج داشته باشم.</li>
                <li>
                  اینجانب متعهد ميگردم خارج از شرايط قرارداد خدمات ارائه ندهم چنانچه در صورت عدم
                  تعهدات شركت آسياسلامت مجاز به برخورد قانونی می باشد.
                </li>
                <li>
                  اینجانب متعهد ميگردم درخواست وام ، ضمانت ، حقوق بیشتر از طرف اول قرارداد ( کارفرما
                  ) نداشته باشم .
                </li>
                <li>
                  اینجانب متعهد ميگردم در طول مدت ساعت كاری از محل كار بدون اطلاع به شركت خارج نشوم
                  .
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
                  اینجانب تمام جزئيات فرم ثبت نام را مطالعه نموده و تمام اطلاعات را وارد شده را به
                  صورت واقعیت اعلام نموده .
                </li>
                <li>
                  اینجانب متعهد ميگردم تمام شرايط و قوانين شركت را انجام دهم در غير اين صورت در
                  برابر شركت هيج ادعا و شكايتی نيز نداشته و شركت میتواند با توجه به سنديات و شواهد
                  موجود نسبت به مدارک ضمانتی اینجانب از طريق مراجع ذيصالح اقدام نماید
                </li>
              </ol>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-end align-center">
              <p style="font-size: 0.8rem; font-weight: bold">
                شرايط را <span class="text-teal-accent-4">قبول</span> دارم
              </p>
              <v-checkbox
                color="teal-accent-4"
                class="term-checkbox"
                hide-details
                :rules="[(v) => !!v || 'You must agree to continue!']"
              >
              </v-checkbox>
            </v-col>
          </v-row>
          <v-col v-if="error" class="text-center" style="padding: 0px">
            <p class="text-red" style="font-size: 0.7rem">برای ادامه باید با قوانين موافقت کنید</p>
          </v-col>
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
    const error = ref(false);
    const submit = async (valid) => {
      if (valid) {
        router.push("/home");
      } else {
        error.value = true;
      }
    };
    const routBackHandler = () => {
      router.push("/employment/relatives-info");
    };
    return { submit, routBackHandler, error };
  },
};
</script>
