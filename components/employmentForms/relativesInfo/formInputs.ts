const formInputs = [
  {
    id:'firstRelative',
    inputs: [
      { title: "نسبت", value: "", id: "information" },
      { title: "آقا/خانم", value: "", id: "name" },
      { title: "مدت آشنایی", value: "", id: "knowTime" },
      { title: "شماره تماس", value: "", type: "num", id: "phoneNumber" },
    ],
  },
  {
    id:'secondRelative',
    inputs: [
      { title: "نسبت", value: "", id: "information" },
      { title: "آقا/خانم", value: "", id: "name" },
      { title: "مدت آشنایی", value: "", id: "knowTime" },
      { title: "شماره تماس", value: "", type: "num", id: "phoneNumber" },
    ],
  },
  {
    id:'thirdRelative',
    inputs: [
      { title: "نسبت", value: "", id: "information" },
      { title: "آقا/خانم", value: "", id: "name" },
      { title: "مدت آشنایی", value: "", id: "knowTime" },
      { title: "شماره تماس", value: "", type: "num", id: "phoneNumber" },
    ],
  },
  {
    id: "family",
    inputs: [
      {
        title: ":شماره تماس همسر",
        value: "",
        type: "num",
        notRequired: true,
        id: "husbandPhoneNumber",
      },
      {
        title: ":شماره تماس فرزند",
        value: "",
        type: "num",
        notRequired: true,
        id: "childPhoneNumber",
      },
      {
        title: ":شماره تماس سرپرست خانواده",
        value: "",
        type: "num",
        notRequired: true,
        id: "parentPhoneNumber",
      },
    ],
  },
];
export default formInputs;
