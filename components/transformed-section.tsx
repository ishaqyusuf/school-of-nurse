"use client";

import { useFormContext } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function TransformedSection() {
  const ctx = useFormContext();
  return (
    <Tabs defaultValue="question" className="flex-1 mb-10">
      <TabsList className="flex">
        <TabsTrigger value="question">Question</TabsTrigger>
        <TabsTrigger value="answers">Answers</TabsTrigger>
        <div className="flex flex-1 justify-end">
          <Button>Transform</Button>
        </div>
      </TabsList>
      <TabsContent value="question" className="h-[90vh]">
        <Textarea
          name="question"
          onChange={(e) => {
            ctx.setValue("question", e.target.value);
          }}
          className="h-full"
        />
      </TabsContent>
      <TabsContent value="answers" className="h-[90vh]">
        <Textarea
          name="answer"
          onChange={(e) => {
            ctx.setValue("question", e.target.value);
          }}
          className="h-full"
        />
      </TabsContent>
    </Tabs>
  );
}
