import { NextRequest, NextResponse } from "next/server";
// import { getStorage, ref, uploadBytes } from "firebase/storage";
// import { uploadFile } from "@/lib/db";
// import { fileRefFormat } from "@/lib/utils";
export async function POST(req: NextRequest) {
  try {
    // const body = await req.json();
    const formData = await req.formData();
    // console.log(formData);
    const file = formData.get("file") as File;
    const url = formData.get("url") as string;

    if (!file && url) {
      return NextResponse.json({ error: "no files received" }, { status: 400 });
    }

    // console.log(`${url}/${file.type}/${file.name}`);
    // console.log(fileRefFormat(url, file));
    // const refName = fileRefFormat(url, file);
    // uploadFile(refName, file);

    return NextResponse.json("ok", { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "failed to upload file" },
      { status: 500 }
    );
  }
}
