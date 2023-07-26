import { adminSDK } from "@/firebase/admin";
import { auth } from "firebase-admin";
import { NextApiHandler, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Middleware } from "next-api-middleware";
import { CustomNextRequest } from "@/interfaces/interface";


export default async function authMiddleware(req: CustomNextRequest) {
  if(adminSDK.apps.length === 0) {
    adminSDK.initializeApp();
  }
  const sessionCookie = req.cookies.get("serverCookie");

  // Ensure sessionCookie and its value exists
  if (!sessionCookie || !sessionCookie.value) {
    return NextResponse.json("Not logged in");
  }
  
  // Use sessionCookie.value, which is a string, instead of the whole sessionCookie object

  //The original cookie needs to be modified because it contains quotation marks which ruin the verification
  


  const {uid} = await auth().verifySessionCookie(sessionCookie, true);
  if (!uid) {
    return  NextResponse.json("Not logged in");
  }
  return uid;
}