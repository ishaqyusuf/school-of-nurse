export type FormType = {
  question;
  csv;
  answers;
  transformed: {
    question;
    answer;
    snDot;

    sn;
    options: {
      a;
      b;
      c;
      d;
    };
  }[];
};
