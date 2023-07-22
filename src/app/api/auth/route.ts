import { adminSDK } from "@/firebase/admin";
import { auth } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

if(adminSDK.apps.length === 0) {
  adminSDK.initializeApp();
}

export async function GET(req: NextRequest, res: NextResponse) {
  const sessionCookie = req.cookies.get("serverCookie");

  // Ensure sessionCookie and its value exists
  if (!sessionCookie || !sessionCookie.value) {
    return NextResponse.json({isLogged: false}, {status: 401});
  }
  
  // Use sessionCookie.value, which is a string, instead of the whole sessionCookie object

  //The original cookie needs to be modified because it contains quotation marks which ruin the verification
  const modifiedCookie = sessionCookie.value.substring(1, sessionCookie.value.length-1);


  const {uid} = await auth().verifySessionCookie(modifiedCookie, true);
  if (!uid) {
    return NextResponse.json({isLogged: false}, {status: 401});
  }

  return NextResponse.json({userId: uid}, {status: 200});
}

