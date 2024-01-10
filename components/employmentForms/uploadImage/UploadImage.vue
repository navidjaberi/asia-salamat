<template>
  <div>
    <VApp>
      <GlobalPageBaseLayout
        title="آپلود عکس"
        formClass="upload-image"
        @baseRouteBackHandler="routBackHandler"
        @baseSubmit="submit"
      >
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
            <p style="font-size: 0.9rem" class="text-right">{{ i.title }}</p>
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
    const formData = ref({});
    const rules = ref([
      (value) => {
        if (!value || !value.length) {
          return "عکس را انتخاب کنید";
        }
       

        return true;
      },
    ]);

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
                const resizedFile = new File([blob], file.name, {
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
            const result = await heic2any({ blob: file });
            reader.readAsDataURL(result);
          } catch (error) {
            console.error("Error converting image:", error);
          }
        } else {
          reader.readAsDataURL(file);
        }
      });
    };
    const submit = async (valid) => {
      if (valid) {
        router.push("/employment/relatives-info");
      }
    };
    const routBackHandler = () => {
      router.push("/employment/collaboration-terms");
    };
    onMounted(() => {});
    return {
      inputFields,
      rules,
      submit,
      routBackHandler,
      updateFormData,
      formData,
    };
  },
};
</script>
