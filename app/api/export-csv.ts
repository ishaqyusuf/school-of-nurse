import { objectToDotNotation, transformToCsv } from "@/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log(req.body);
  const { format, data } = req.body as any;

  const csvContent = transformToCsv(data, format);
  //   res.status(200).json({ message: "Hello from Next.js!" });
  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=exported_data.csv"
  );

  // Send CSV content
  res.status(200).send(csvContent as any);
}
