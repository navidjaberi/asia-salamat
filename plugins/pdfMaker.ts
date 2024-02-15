import { jsPDF } from "jspdf";
export default defineNuxtPlugin((app) => {
  app.vueApp.use(jsPDF);
});
