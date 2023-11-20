const formInput =[
    {
      title: "نام و نام خانوادگی",
      icon: "mdi-account",
      required: true,
      value: "",
      type: "text",
    },
    {
      title: "نام پدر",
      icon: "mdi-human-male-boy",
      required: true,
      value: "",
      type: "text",
    },
    {
      title: "تاریخ تولد",
      icon: "mdi-calendar-range",
      required: true,
      value: "",
      type: "date",
    },

    {
      title: "محل صدور",
      icon: "mdi-city",
      required: true,
      value: "",
      type: "text",
    },
    {
      title: "کد ملی",
      icon: "mdi-card-account-details-outline",
      required: true,
      value: "",
      type: "Num",
    },
    {
      title: "شماره شناسنامه",
      icon: "mdi-card-account-details-outline",
      required: true,
      type: "Num",
    },
    { title: "میزان تحصیلات", required: true, value: "", type: "chips" },
    { title: "استان", icon: "mdi-city", required: true, value: "",type:"autoCompleteState" ,id:'state'},
    { title: "شهر", icon: "mdi-city", required: true, value: "",type:"autoCompleteCity",id:'city' },
    { title: "محله", icon: "mdi-home-group", required: true, value: "",type: "text" },
    {
      title: "نام خیابان",
      icon: "mdi-road-variant",
      required: true,
      value: "",
      type: "text" 
    },
    { title: "نام کوچه", icon: "mdi-road", required: false, value: "", type: "text" },
    {
      title: "پلاک",
      icon: "mdi-home-map-marker",
      required: true,
      value: '',
      type: "text",
    },
    { title: "واحد", icon: "mdi-view-module", required: true, value: "", type: "text" },
    {
      title: "شماره تلفن همراه",
      icon: "mdi-cellphone",
      required: true,
      value: "",
      type: "number",
    },
    {
      title: "شماره تلفن منزل",
      icon: "mdi-phone",
      required: false,
      value: "",
      type: "number",
    },
  ];
  export default formInput;