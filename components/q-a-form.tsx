"use client";

import { useFormContext } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

export default function QAFormSection() {
  const ctx = useFormContext();
  return (
    <Tabs defaultValue="question" className="flex-1 mb-10">
      <TabsList>
        <TabsTrigger value="question">Question</TabsTrigger>
        <TabsTrigger value="answers">Answers</TabsTrigger>
      </TabsList>
      <TabsContent value="question" className="h-[90vh]">
        <Textarea
          name="question"
          defaultValue={ctx.getValues("question")}
          onChange={(e) => {
            ctx.setValue("question", e.target.value);
          }}
          className="h-full"
        />
      </TabsContent>
      <TabsContent value="answers" className="h-[90vh]">
        <Textarea
          name="answer"
          defaultValue={ctx.getValues("question")}
          onChange={(e) => {
            ctx.setValue("answers", e.target.value);
          }}
          className="h-full"
        />
      </TabsContent>
    </Tabs>
  );
}
