"use client";

import { FormProvider } from "@/lib/provider";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export default function QAFormSection() {
  const value = {};
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
