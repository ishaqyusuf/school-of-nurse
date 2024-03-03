"use client";

import QAFormSection from "@/components/q-a-form";
import TransformedSection from "@/components/transformed-section";
import { FormType } from "@/type";
import { FormProvider, useForm } from "react-hook-form";

export default function HomePage() {
  const form = useForm<FormType>({
    defaultValues: {},
  });
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
