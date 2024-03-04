import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function objectToDotNotation(obj, prefix = "") {
  let result = {};

  for (let key in obj) {
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      let nestedKeys = objectToDotNotation(obj[key], prefix + key + ".");
      result = { ...result, ...nestedKeys };
    } else {
      result[prefix + key] = obj[key];
    }
  }

  return result;
}
export function transformToCsv(data, format) {
  const csvContent: any[] = [
    "sn,question,optionA,optionB,optionC,optionD,answer",
  ];
  // console.log(data);
  // console.log(format);
  data.map((d) => {
    const dot = objectToDotNotation(d);
    let line = format;
    line.split(",").map((l) => {
      let a = dot[l]?.replace(/"/g, '""');

      if (a.includes(",")) a = `"${a}"`;

      line = line.replace(l, a);
    });
    csvContent.push(line);
  });
  const res = csvContent.join("\n");
  // console.log(res);
  return res;
}
