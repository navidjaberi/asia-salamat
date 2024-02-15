<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="آپلود عکس"
        formClass="upload-image"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
        <BaseLoadingAndError :loading="loading" :error="postError" class="mb-3" :postData="true" />
        <v-row class="mb-7">
          <v-col
            xxl="5"
            xl="6"
            lg="7"
            md="8"
            cols="12"
            class="pa-0 mx-auto"
            v-for="(i, index) in inputFields"
            key="i"
          >
            <p class="text-right text-title">{{ i.title }}</p>
            <v-file-input
              accept="image/png, image/jpeg,image/heic"
              show-size
              prepend-icon="none"
              color="teal-accent-4"
              label="انتخاب عکس"
              :rules="index === 3 || i.loading === true ? [] : rules"
              :loading="i.loading === true"
              required
              prepend-inner-icon="mdi-camera"
              :model-value="formData[i.id]"
              @update:model-value="updateFormData(i.id, $event, i)"
              ><v-icon slot:prepend-inner> </v-icon>
            </v-file-input>
            <v-divider v-if="index < 3"></v-divider>
          </v-col>
        </v-row>
      </GlobalPageBaseLayout>
    </VApp>
  </div>
</template>
<script>
import formInputs from "./formInputs.ts";
import heic2any from "heic2any";
export default {
  setup() {
    const inputFields = ref(formInputs);
    const router = useRouter();
    const nurseId = ref(localStorage.getItem("nurseId"));
    const formData = ref({});
    const loading = ref(false);
    const getError = ref(false);
    const postError = ref(false);
    //check the input's validation
    const rules = ref([
      (value) => {
        if (!value || !value.length) {
          return "عکس را انتخاب کنید";
        }

        return true;
      },
    ]);
    //make an object of input's name as key and v-model's value as the object value and resize the images
    const updateFormData = async (name, value, object) => {
      object.loading = true;
      if (Array.isArray(value) && value.length > 0) {
        const resizedImage = await resizeImage(value[0]);
        formData.value = { ...formData.value, [name]: [resizedImage] };
      } else {
        formData.value = { ...formData.value, [name]: value };
      }
      object.loading = false;
    };
    //get the images names from local storage and make a request to get the image file
    const getLocalImages = async () => {
      const localStorageImgNames = JSON.parse(localStorage.getItem("nurseImgNames"));
      for (let [key, value] of Object.entries(localStorageImgNames)) {
        try {
          const imageData = await useMyFetch(`/uploads/${value}`, loading, getError, "get");
          const convertBlobToFile = new File([imageData], value, {
            type: imageData.type,
            lastModified: Date.now(),
          });
          formData.value[key] = [convertBlobToFile];
        } catch (e) {
          console.log(e);
          getError.value = true;
        }
      }
    };
    //a function for reduce the image's size and convert the heic images to jpeg
    const resizeImage = (file) => {
      return new Promise(async (resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const MAX_FILE_SIZE_BYTES = 1 * 1024 * 1024; // 1 MB
            const scaleFactor = Math.min(1, MAX_FILE_SIZE_BYTES / (img.width * img.height * 1.5));
            const width = Math.floor(img.width * scaleFactor);
            const height = Math.floor(img.height * scaleFactor);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                const imageName = file.name.replace("HEIC", "jpeg");
                const resizedFile = new File([blob], imageName, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                resolve(resizedFile);
              },
              file.type,
              0.8 // Adjust the quality value if needed
            );
          };
          img.src = event.target.result;
        };
        if (file.type === "image/heic") {
          try {
            const result = await heic2any({ blob: file }); //convert heic to blob
            reader.readAsDataURL(result);
          } catch (error) {
            console.error("Error converting image:", error);
          }
        } else {
          reader.readAsDataURL(file);
        }
      });
    };
    //make the final object of images and make a request for posting data and forward the form to the next step
    const submit = async (valid) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (valid) {
        localStorage.removeItem('nurseImgNames')
        const formDataPost = new FormData();
        formDataPost.append("NurseId", nurseId.value);
        formDataPost.append("Picture", formData.value.Picture[0]);
        formDataPost.append("FirstPageImage", formData.value.FirstPageImage[0]);
        formDataPost.append("DescriptionImage", formData.value.DescriptionImage[0]);
        if (formData.value.AgreementImage) {
          formDataPost.append("AgreementImage", formData.value.AgreementImage[0]);
        }
        try {
          const data = await useMyFetch(
            "/Nurse/uploads",
            loading,
            postError,
            "put",
            "",
            formDataPost
          );
          localStorage.setItem(
            "nurseImgNames",
            JSON.stringify({
              Picture: data.NurseImages.Picture,
              FirstPageImage: data.NurseImages.FirstPageImage,
              DescriptionImage: data.NurseImages.DescriptionImage,
              AgreementImage: data.NurseImages.AgreementImage,
            })
          );
          localStorage.setItem('pdfNum',data.formCode)
          router.push("/employment/relatives-info");
        } catch (error) {
          error = true;
          console.error("Error fetching data:", error);
        }
      }
    };
    //form backward button
    const routBackHandler = () => {
      router.push("/employment/collaboration-terms");
    };
    onMounted(() => {
      if (localStorage.getItem("nurseImgNames")) {
        getLocalImages();
      }
    });
    return {
      inputFields,
      rules,
      submit,
      routBackHandler,
      updateFormData,
      loading,
      postError,
      formData,
    };
  },
};
</script>
