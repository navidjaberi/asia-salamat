const formInputs = [
  {
    id:'firstRelative',
    inputs: [
      { title: "آقا/خانم", value: "", id: "name" },
      { title: "نسبت", value: "", id: "information" },
      { title: "شماره تماس", value: "", type: "num", id: "phoneNumber" },
      { title: "مدت آشنایی", value: "", id: "knowTime" },
    ],
  },
  {
    id:'secondRelative',
    inputs: [
      { title: "آقا/خانم", value: "", id: "name" },
      { title: "نسبت", value: "", id: "information" },
      { title: "شماره تماس", value: "", type: "num", id: "phoneNumber" },
      { title: "مدت آشنایی", value: "", id: "knowTime" },
    ],
  },
  {
    id:'thirdRelative',
    inputs: [
      { title: "آقا/خانم", value: "", id: "name" },
      { title: "نسبت", value: "", id: "information" },
      { title: "شماره تماس", value: "", type: "num", id: "phoneNumber" },
      { title: "مدت آشنایی", value: "", id: "knowTime" },
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
