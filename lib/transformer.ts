export function transformQuestions(questions: any, answers: any) {
  console.log({ questions, answers });
  let questionList: any[] = [];
  let q: any = null;
  let qs = questions
    .split("\n")
    .filter((f) => !Number(f.trim()))
    .join(" ")
    .replace("  ", " ");
  Array(99)
    .fill(null)
    .map((a, i) => (qs = qs.replaceAll(` ${100 - i}. `, `\n${100 - i}. `)));
  ["a", "b", "c", "d"].map((c) => {
    qs = qs.replaceAll(`(${c}) `, `\n(${c}) `);
  });
  //   console.log(qs);
  let answerrs = answers.replaceAll(`\n`, " ");
  console.log(answerrs);
  const answersSn: any = {};
  Array(100)
    .fill(null)
    .map((a, i) => {
      let sn = `${i + 1}.`;
      let sec = answerrs.split(sn)[1]?.trim().split(" ")?.filter(Boolean)?.[0];
      answersSn[sn] = sec;
    });

  let question: any = null;
  console.log(qs.split("\n"));
  let qss: any[] = [];
  qs.split("\n").map((line) => {
    line = line.trim();

    let sn = line.split(".").filter(Boolean)[0];
    //   console.log(sn);

    if (Number(sn) > 0) {
      if (question) {
        qss.push({ ...question });
        console.log(qss);
      }
      question = {
        sn,
        snDot: `${sn}.`,
        question: line.replace(`${sn}. `, ""),
        options: {},
      };
      return;
    }
    if (question) {
      if (["(", ")"].every((s) => line.includes(s)) && line.startsWith("(")) {
        let optnText = line.split(" ").filter(Boolean)[0];
        if (optnText) {
          let opt = line.replace(`${optnText} `, "");
          question.options[optnText?.replace("(", "").replace(")", "")] = opt;
          question.answer = answersSn[question.snDot];
        }
      }
    }
  });
  if (question) qss.push(question);
  console.log(question);
  return qss;
}
