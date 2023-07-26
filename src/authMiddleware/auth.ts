import { adminSDK } from "@/firebase/admin";
import { auth } from "firebase-admin";
import { NextApiHandler, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Middleware } from "next-api-middleware";
import { CustomNextRequest } from "@/interfaces/interface";
import { cookies } from "next/headers";


export default async function verifyAuth() {
  if(adminSDK.apps.length === 0) {
    adminSDK.initializeApp();
  }
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get('serverCookie')?.value;

  // Ensure sessionCookie and its value exists
  if (!sessionCookie) {
    return new Error("no cookie")
  }
  
  // Use sessionCookie.value, which is a string, instead of the whole sessionCookie object

  //The original cookie needs to be modified because it contains quotation marks which ruin the verification
  


  const {uid} = await auth().verifySessionCookie(sessionCookie, true);
  if (!uid) {
    return new Error("invalid cookie")
  }
  return uid;
}