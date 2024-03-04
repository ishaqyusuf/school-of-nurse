"use client";

import QAFormSection from "@/components/q-a-form";
import TransformedSection from "@/components/transformed-section";
import { FormType } from "@/type";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocalStorage } from "react-use-storage";
export default function HomePage() {
  const [saved, setValue, removeValue] = useLocalStorage(
    "school-of-nurse",
    null
  );
  // const saved = localStorage.getItem("school-of-nurse");

  const defaultValues = saved
    ? saved
    : {
        csv: "question,option.a,option.b,option.c,option.d,answer",
      };
  console.log(defaultValues);

  const form = useForm<FormType>({
    defaultValues: {
      ...defaultValues,
    },
  });
  const [answers, question, csv] = form.watch(["answers", "question", "csv"]);
  useEffect(() => {
    console.log("...");
    setValue({
      answers,
      question,
      csv,
    } as any);
    // localStorage.setItem(
    //   "school-of-nurse",
    //   JSON.stringify({
    //     answers,
    //     question,
    //     csv,
    //   })
    // );
  }, [answers, question, csv]);
  const value = {
    form,
  };
  return (
    <FormProvider {...form}>
      <div className="h-screen overflow-hidden grid grid-cols-2">
        <div className="flex flex-col h-full ">
          <QAFormSection />
        </div>
        <div className="flex flex-col h-full ">
          <TransformedSection />
        </div>
      </div>
    </FormProvider>
  );
}
