import { adminSDK } from "@/firebase/admin";
import { auth } from "firebase-admin";
import { cookies } from "next/headers";


export default async function verifyAuth(): Promise<string|Error> {
  if(adminSDK.apps.length === 0) {
    adminSDK.initializeApp();
  }
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get('serverCookie')?.value;

  // Ensure sessionCookie and its value exists
  if (!sessionCookie) {
    return new Error("no cookie")
  }
  
  try {
    const {uid} = await auth().verifySessionCookie(sessionCookie, true);
    if (!uid) {
      return new Error("invalid cookie")
    }
    return uid;
  } catch(err) {
    return new Error("some error occured")
  }
 
  
 
}