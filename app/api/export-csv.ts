import { objectToDotNotation } from "@/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { format, data } = req.query as any;
  const csvContent = [];
  data.map((d) => {
    const dot = objectToDotNotation(d);
    let line = format;
    line.split(",").map((l) => {
      line = line.replace(l, dot[l]);
    });
    csvContent;
  });
  //   res.status(200).json({ message: "Hello from Next.js!" });
  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=exported_data.csv"
  );

  // Send CSV content
  res.status(200).send(csvContent.join("\n") as any);
}
