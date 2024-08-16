import {
  app,
  auth,
  loginEmainPassword,
  logout,
  monitorAuthState,
  persistenceLogin,
} from "@/lib/db";
import { getAuth } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await loginEmainPassword(body.email, body.password);
    return NextResponse.json("logged in", { status: 200 });
  } catch (err) {
    console.log(err);
    NextResponse.json("unable to login", { status: 500 });
  }
}
