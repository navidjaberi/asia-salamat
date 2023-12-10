const formInputs = [
  {
    type: "known",
    inputs: [
      { title: "نسبت", value: "" },
      { title: "آقا/خانم", value: "" },
      { title: "مدت آشنایی", value: "" },
      { title: "شماره تماس", value: "", type: "num" },
    ],
  },
  {
    type: "known",

    inputs: [
      { title: "نسبت", value: "" },
      { title: "آقا/خانم", value: "" },
      { title: "مدت آشنایی", value: "" },
      { title: "شماره تماس", value: "", type: "num" },
    ],
  },
  {
    type: "known",
    inputs: [
      { title: "نسبت", value: "" },
      { title: "آقا/خانم", value: "" },
      { title: "مدت آشنایی", value: "" },
      { title: "شماره تماس", value: "", type: "num" },
    ],
  },
  {
    type: "relatives",
    inputs: [
      { title: ":شماره تماس همسر", value: "", type: "num", notRequired: true },
      { title: ":شماره تماس فرزند", value: "", type: "num", notRequired: true },
      { title: ":شماره تماس سرپرست خانواده", value: "", type: "num", notRequired: true },
    ],
  },
];
export default formInputs;
