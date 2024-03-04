import { objectToDotNotation, transformToCsv } from "@/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";

const POST = async (req, res: NextApiResponse) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  // console.log(req.json());

  const data = await req.json();

  const { format, csv } = data;

  //   res.status(200).json({ message: "Hello from Next.js!" });

  // console.log(">>>>>>");
  // res.setHeader("Content-Type", "text/json");
  // res.setHeader(
  //   "Content-Disposition",
  //   "attachment; filename=exported_data.csv"
  // );
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/json",
      "Content-Disposition": "attachment; filename=exported_data.csv",
    },
  });
  // Send CSV content
  // res.status(200).send(csv as any);

  // return res;
};
export { POST };
