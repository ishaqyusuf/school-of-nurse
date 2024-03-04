export type FormType = {
  question;
  csv;
  answers;
  transformed: {
    question;
    answer;
    snDot;
    sn;
    option: {
      a;
      b;
      c;
      d;
    };
  }[];
};
