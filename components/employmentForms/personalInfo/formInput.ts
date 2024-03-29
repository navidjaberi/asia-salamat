const formInput = [
  {
    title: "نام و نام خانوادگی",
    icon: "mdi-account",
    required: true,
    id: "name",
    type: "text",

    nurseForm: true,
    academyForm: true,
  },
  {
    title: "نام پدر",
    icon: "mdi-human-male-boy",
    required: true,
    id: "fatherName",
    type: "text",

    nurseForm: true,
    academyForm: true,
  },
  {
    title: "تاریخ تولد",
    icon: "mdi-calendar-range",
    required: true,
    id: "birthday",
    type: "date",
    nurseForm: false,
    academyForm: false,
  },

  {
    title: "محل صدور",
    icon: "mdi-city",
    required: true,
    id: "bornCity",
    type: "text",
  
    nurseForm: true,
    academyForm: true,
  },
  {
    title: "کد ملی",
    icon: "mdi-card-account-details-outline",
    id: "nationalCode",
    required: true,
    type: "nationalCode",
    mode:"tel",
    nurseForm: true,
    academyForm: true,
  },
  {
    title: "شماره شناسنامه",
    icon: "mdi-card-account-details-outline",
    id: "nationalNumber",
    required: true,
    type: "nationalNumber",
    mode:"tel",
    nurseForm: true,
    academyForm: true,
  },
  {
    title: "میزان تحصیلات",
    required: true,
    type: "chips",
    id: "education",
    nurseForm: false,
    academyForm: false,
  },
  {
    title: "استان",
    icon: "mdi-city",
    required: true,
    type: "autoCompleteState",
    id: "state",
    nurseForm: false,
    academyForm: false,
  },
  {
    title: "شهر",
    icon: "mdi-city",
    required: true,
    type: "autoCompleteCity",
    id: "city",
    nurseForm: false,
    academyForm: false,
  },
  {
    title: "محله",
    icon: "mdi-home-group",
    required: true,
    type: "text",
    id: "neighborHood",
    nurseForm: true,
    academyForm: true,
  },
  {
    title: "نام خیابان",
    icon: "mdi-road-variant",
    id: "street",
    required: true,
    type: "text",
    nurseForm: true,
    academyForm: true,
  },
  {
    title: "نام کوچه",
    icon: "mdi-road",
    required: false,
    id: "alley",
    type: "text",
    nurseForm: true,
    academyForm: true,
  },
  {
    title: "پلاک",
    icon: "mdi-home-map-marker",
    required: true,
    id: "houseNumber",
    type: "text",
    
    nurseForm: true,
    academyForm: true,
  },
  {
    title: "واحد",
    icon: "mdi-view-module",
    required: true,
    id: "unit",
    type: "text",
    nurseForm: true,
    academyForm: true,
  },
  {
    title: "کد پستی",
    icon: "mdi-mailbox-up",
    required: true,
    id: "postalCode",
    type: "postalCode",
    mode:"tel",
    nurseForm: true,
    academyForm: true,
  },
  {
    title: "شماره تلفن همراه",
    icon: "mdi-cellphone",
    id: "phoneNumber",
    required: true,
    type: "Num",
    mode:"tel",
    nurseForm: true,
    academyForm: true,
  },

  {
    title: "شماره تلفن ضروری",
    icon: "mdi-cellphone",
    id: "emergencyNumber",
    required: true,
    type: "Num",
    mode:"tel",
    nurseForm: false,
    academyForm: true,
  },
  {
    title: "شماره تلفن منزل",
    icon: "mdi-phone",
    id: "homeNumber",
    required: false,
    type: "Num",
    mode:"tel",
    nurseForm: true,
    academyForm: false,
  },
];
export default formInput;
