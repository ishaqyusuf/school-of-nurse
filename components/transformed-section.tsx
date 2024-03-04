"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { FormType } from "@/type";
import { transformQuestions } from "@/lib/transformer";
import { ScrollArea } from "./ui/scroll-area";
import { cn, objectToDotNotation, transformToCsv } from "@/lib/utils";
import { Label } from "./ui/label";

export default function TransformedSection() {
  const ctx = useFormContext<FormType>();
  const arr = useFieldArray({
    control: ctx.control,
    name: "transformed",
    keyName: "_id",
  });
  function transform() {
    const t = transformQuestions(
      ctx.getValues("question"),
      ctx.getValues("answers")
    );
    console.log(t);
    // ctx.setValue("transformed", t as any);
    arr.replace(t as any);
  }
  function convertToCSV(data) {
    const csvContent = data.map((row) => row.join(",")).join("\n");
    return csvContent;
  }
  function downloadCSV(csvContent, fileName) {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    // if (navigator.msSaveBlob) {
    //   // For IE
    //   navigator.msSaveBlob(blob, fileName);
    // } else {
    //   const link = document.createElement("a");
    //   if (link.download !== undefined) {
    //     const url = URL.createObjectURL(blob);
    //     link.setAttribute("href", url);
    //     link.setAttribute("download", fileName);
    //     link.style.visibility = "hidden";
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   }
    // }
  }
  function exportCsv() {
    // const dot = objectToDotNotation()
    // document?.getElementById("exportButton").addEventListener("click", () => {
    //   const csvContent = convertToCSV(data);
    //   const fileName = "exported_data.csv";
    //   downloadCSV(csvContent, fileName);
    // });
    const format = ctx.getValues("csv");
    const csv = transformToCsv(arr.fields, format);
    const euri = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", euri);
    link.setAttribute("download", "questions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // return;
    // fetch("/api/export-csv", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     csv,
    //   }),
    // });
  }
  return (
    <Tabs defaultValue="question" className="flex-1 mb-10">
      <TabsList className="flex">
        <TabsTrigger value="question">Question</TabsTrigger>
        <TabsTrigger value="csv">Csv</TabsTrigger>
        <div className="flex flex-1 justify-end">
          <Button onClick={transform}>Transform</Button>
        </div>
      </TabsList>
      <TabsContent value="question" className="h-[90vh]">
        <ScrollArea className="h-[90vh]">
          <div className="space-y-2 px-4">
            {arr.fields?.map((t, i) => (
              <div key={i} className="space-y-1">
                <div className="flex">
                  <div className="w-10 font-bold">{t.snDot}</div>
                  <div className="font-medium">{t.question}</div>
                </div>
                <div className="flex  flex-wrap space-x-2 mx-4">
                  {Object.keys(t.option).map((o) => (
                    <div
                      className={cn(
                        o == t.answer?.toLowerCase() && "bg-green-300",
                        "px-1 text-muted-foreground rounded-sm whitespace-nowrap"
                      )}
                      key={o}
                    >
                      <span className="font-bold mr-2 uppercase"> {o}.</span>
                      <span>{t.option[o]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
      <TabsContent value="csv" className="h-[90vh] p-4 space-y-2">
        <div className="grid gap-2">
          <Label>Csv Format</Label>
          <Textarea
            className=""
            defaultValue={ctx.getValues("csv")}
            onChange={(e) => {
              ctx.setValue("csv", e.target.value);
            }}
          ></Textarea>
        </div>
        <div className="flex justify-end">
          <Button onClick={exportCsv}>Export</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
