"use client";

import { FormProvider } from "@/lib/provider";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useForm } from "react-hook-form";

export default function QAFormSection() {
  const form = useForm({
    defaultValues: {},
  });
  const value = {
    form,
  };
  return (
    <FormProvider.Provider value={value}>
      <Tabs>
        <TabsList>
          <TabsTrigger value="form"></TabsTrigger>
        </TabsList>
      </Tabs>
    </FormProvider.Provider>
  );
}
