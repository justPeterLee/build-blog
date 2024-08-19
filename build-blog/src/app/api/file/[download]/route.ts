// import { downloadFile } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  try {
    const { params } = context;
    console.log(params.download);
    // const url = await downloadFile();
    // console.log(url);
    // return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    return NextResponse.json("could not download file", { status: 500 });
  }
}
