export function transformQuestions(questions: any, answers: any) {
  // console.log({ questions, answers });
  let questionList: any[] = [];
  let q: any = null;
  let qs = questions
    .split("\n")
    .filter((f) => !Number(f.trim()))
    .join(" ")
    .replace("  ", " ");
  const answersSn: any = {};
  let questionCount = 0;
  let answerrs = answers.replaceAll(`\n`, " ");
  while (true) {
    let csn = questionCount + 1;
    let sn = `${csn}.`;
    let sec = answerrs
      .split(sn)[1]
      ?.trim()
      .split(" ")
      ?.filter(Boolean)?.[0]
      ?.trim()
      ?.toLowerCase();
    if (sec) {
      answersSn[sn] = sec;
      questionCount = csn;
    } else break;
  }
  // Array(100)
  //   .fill(null)
  //   .map((a, i) => {
  //     let sn = `${i + 1}.`;
  //     let sec = answerrs
  //       .split(sn)[1]
  //       ?.trim()
  //       .split(" ")
  //       ?.filter(Boolean)?.[0]
  //       ?.trim()
  //       ?.toLowerCase();
  //     answersSn[sn] = sec;
  //   });
  Array(questionCount - 1)
    .fill(null)
    .map(
      (a, i) =>
        (qs = qs.replaceAll(
          ` ${questionCount - i}. `,
          `\n${questionCount - i}. `
        ))
    );
  qs = qs.replace(/([A-E])\. /gi, (match, p1) => {
    return `(${p1.toLowerCase()}) `;
  });
  qs = qs.replace(/(\([a-e]\))([^\s])/gi, "$1 $2");
  ["a", "b", "c", "d", "e"].map((opt) => {
    qs = qs.replaceAll(`(${opt}) `, `\n(${opt}) `);
    qs = qs.replaceAll(`(${opt?.toUpperCase()}) `, `\n(${opt}) `);
  });
  //   console.log(qs);
  // console.log(answerrs);

  let question: any = null;
  // console.log(qs.split("\n"));

  let qss: any[] = [];
  qs.split("\n").map((line) => {
    line = line.trim();
    let sn = line.split(".").filter(Boolean)[0];
    //   console.log(sn);
    if (Number(sn) > 0) {
      if (question) {
        qss.push(transformOptions({ ...question }));
        // console.log(qss);
      }
      question = {
        sn,
        snDot: `${sn}.`,
        question: line.replace(`${sn}. `, ""),
        option: {},
      };
      return;
    }
    if (question) {
      if (["(", ")"].every((s) => line.includes(s)) && line.startsWith("(")) {
        let optnText = line.split(" ").filter(Boolean)[0];
        if (optnText) {
          let opt = line.replace(`${optnText} `, "");
          let optTxt = optnText?.replace("(", "").replace(")", "");
          question.option[optTxt] = opt;
          let answer = answersSn[question.snDot];
          question.answer = answer;
        }
      }
    }
  });
  if (question) qss.push(transformOptions(question));
  // console.log(question);
  return qss;
}

function transformOptions(question: any) {
  if (question.answer?.toLowerCase() == "e") {
    question.answer = "a";
    question.option.a = question.option.e;
    delete question.option.e;
  } else {
    delete question.option.e;
  }
  return question;
}
