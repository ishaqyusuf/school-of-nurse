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
