// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { jsPDF } from "jspdf";
import account from "~/assets/img/pics/account.jpg";
import stamp from "~/assets/img/pics/stamp.png";
import { AmiriRegular } from "~/assets/fonts/amiri-font";
import {NurseEmployment} from "~/types/nurseEmploymentInfo"
const base64Img = ref<null | string>(null);
// Function to convert English digits to Farsi digits
const toFarsiNumber = <T extends string | number>(n: T): string => {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return n
    .toString()
    .split("")
    .map((x: any) => farsiDigits[x])
    .join("");
};
// Async function to fetch and convert image to base64
const getImage = async ()   => {
  try {
    // Fetching image names from local storage
    const getImagesFromLocal = localStorage.getItem("nurseImgNames") as string;
    const allImages = JSON.parse(getImagesFromLocal) 
    const picture = allImages.Picture;
    const imageBlob = await useMyFetch(`/uploads/${picture}`, ref(false), ref(false), "get");
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    // Returning a promise to handle image loading asynchronously
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
    });
  } catch (e) {
    console.log(e);
  }
};
// Async function to convert image to base64 and set it in the ref
const convertImgToBase64 = async () => {
  try {
    const image = await getImage();
    base64Img.value = image;
  } catch (error) {
    console.error("Error:", error);
  }
};
// Invoking the image conversion function on component initialization
convertImgToBase64();

const getLocalStoragePdfData = () : NurseEmployment => {
  const localStoragePdfData = localStorage.getItem("employmentPersonalInfo") as string
  const convertPdfData= JSON.parse(localStoragePdfData) 
  return convertPdfData;
};
// Function to generate a random Farsi number
const randomFarsiNumbers = () : string => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const randomFarsiNum = toFarsiNumber(randomNum);
  return randomFarsiNum;
};
// Exported function to create and save the PDF

export const useMakePdf = (): File[] | null  => {
  
  // Retrieving data from local storage
  const pdfData = getLocalStoragePdfData();
  // Generating a random Farsi number for document identification
  if (!pdfData) {
    console.error("Error: Unable to fetch data from local storage");
    return null;
  }
  const pdfNumber = randomFarsiNumbers();
  // Getting today's date in Farsi format
  const today = new Date().toLocaleDateString("fa-IR");
  // Creating a new jsPDF document
  const pdfNum=localStorage.getItem('pdfNum')
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "a3",
  });

  // Adding Amiri-Regular font to the document
  doc.addFileToVFS("Amiri-Regular.ttf", AmiriRegular);
  doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
  doc.setFont("Amiri");
  doc.setFontSize(30);
  
  // Adding content to the first page
  doc.text("بسمه تعالی", 6, 1, { align: "right", lang: "ar" } );
  doc.setFontSize(19);
  doc.text(today + ":تاریخ", 2, 1.5, { align: "right", lang: "ar"});
  doc.text((pdfNum ? pdfNum : pdfNumber)  + ":شماره", 2, 1, { align: "right", lang: "ar" });
  doc.text(".........:پیوست", 2, 2, { align: "right", lang: "ar" });
  // Adding an image to the first page
  doc.addImage(base64Img.value ? base64Img.value : account, "JPEG", 9, 1, 2.5, 3, "FAST");
  // Adding a stamp image to the first page
  doc.addImage(stamp, "PNG", 9, 3.7, 2.5, 0.8);
  doc.setFontSize(30);
  doc.text("سرپرست محترم تشخیص هویت", 11.2, 5.2, { align: "right", lang: "ar" });
  doc.setFontSize(22);
  doc.text("باسلام", 11.2, 6, { align: "right", lang: "ar" });
  doc.text(
    `احتراما شرکت آسیا سلامت اندیشان البرز خانم/آقا ${pdfData.name} فرزند ${pdfData.fatherName} `,
    11.2,
    6.8,
    { align: "right", lang: "ar" }
  );
  doc.text(
    ` متولد ${pdfData.birthday} به شماره شناسنامه ${pdfData.nationalNumber} و کد ملی ${pdfData.nationalCode}`,
    11.2,
    7.6,
    { align: "right", lang: "ar" }
  );
  doc.text(`.را جهت تایید عدم سابقه کیفری به حضورتان معرفی میگردد `, 11.2, 8.4, {
    align: "right",
    lang: "ar",
  });
  doc.setFontSize(19);
  doc.text(`کرج ،رجایی شهر ، خیابان آزادی ، نبش ۶ شرقی ، فاز  ۱ ، پلاک ۱۸۶ ، واحد ۱`, 11.2, 10, {
    align: "right",
    lang: "ar",
  });
  doc.text(`۳۱۴۶۹۸۳۳۵۳:کدپستی`, 11.2, 10.9, { align: "right", lang: "ar" });
  doc.text(`با تشکر`, 2, 14, { align: "right", lang: "ar" });
  // Adding content to the second page
  doc.addPage();
  doc.setFontSize(30);
  doc.text("بسمه تعالی", 6, 1, { align: "right", lang: "ar" });
  doc.setFontSize(19);
  doc.text(today + ":تاریخ", 2, 1.5, { align: "right", lang: "ar" });
  doc.text((pdfNum ? pdfNum : pdfNumber)  + ":شماره", 2, 1, { align: "right", lang: "ar" });
  doc.text(".........:پیوست", 2, 2, { align: "right", lang: "ar" });
  doc.addImage(base64Img.value ? base64Img.value : account, "JPEG", 9, 1, 2.5, 3, "FAST");
  doc.addImage(stamp, "PNG", 9, 3.7, 2.5, 0.8);
  doc.setFontSize(30);
  doc.text("سرپرست محترم آزمایشگاه", 11.2, 5.2, { align: "right", lang: "ar" });
  doc.setFontSize(22);
  doc.text("باسلام", 11.2, 6, { align: "right", lang: "ar" });
  doc.text(
    `احتراما شرکت آسیا سلامت اندیشان البرز خانم/آقا ${pdfData.name} فرزند ${pdfData.fatherName} `,
    11.2,
    6.8,
    { align: "right", lang: "ar" }
  );
  doc.text(
    ` متولد ${pdfData.birthday} به شماره شناسنامه ${pdfData.nationalNumber} و کد ملی ${pdfData.nationalNumber}`,
    11.2,
    7.6,
    { align: "right", lang: "ar" }
  );
  doc.text(`.را جهت انجام آزمایش عدم اعتیاد به حضورتان معرفی میگردد `, 11.2, 8.4, {
    align: "right",
    lang: "ar",
  });
  doc.setFontSize(19);
  doc.text(`کرج ،رجایی شهر ، خیابان آزادی ، نبش ۶ شرقی ، فاز  ۱ ، پلاک ۱۸۶ ، واحد ۱`, 11.2, 10, {
    align: "right",
    lang: "ar",
  });
  doc.text(`۳۱۴۶۹۸۳۳۵۳:کدپستی`, 11.2, 10.9, { align: "right", lang: "ar" });
  doc.text(`با تشکر`, 2, 14, { align: "right", lang: "ar" });
  // Generating a data URI for the document
  const dataUri = doc.output("blob");
  // Creating a File object with the generated data URI
  var generatedPdf = new File([dataUri], `${pdfData.nationalCode}.pdf`, {
    lastModified: 1534584790000,
  });
  // Saving and downloading the PDF
  doc.save(`${pdfData.nationalCode}.pdf`);
  // Returning the generated PDF as a File object for external usage
  return [generatedPdf];
};
