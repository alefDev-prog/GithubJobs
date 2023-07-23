import { adminSDK } from "@/firebase/admin";
import { auth } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

if(adminSDK.apps.length === 0) {
    adminSDK.initializeApp();
}

export async function POST(req: NextRequest, res: NextResponse) {
    const authorization = req.headers.get("Authorization");
  
    if (authorization?.startsWith("Bearer ")) {
      const idToken = authorization.split("Bearer ")[1];
      const decodedToken = await auth().verifyIdToken(idToken);
  
      if (decodedToken) {
        // Generate session cookie
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookie = await auth().createSessionCookie(idToken, { expiresIn: expiresIn  });
    
        
        // Build a NextResponse object
        const nextResponse = NextResponse.json({message: "All OK"}, {status: 200});

        nextResponse.cookies.set({
            name: 'serverCookie',
            value: sessionCookie,
            httpOnly: true,
            secure: true,
            maxAge: expiresIn
        });

        //set cookie for Github accessToken
        const accessToken = await req.json();
        nextResponse.cookies.set({
          name: 'accessToken',
          value: accessToken,
          httpOnly: true,
          secure: true,
          maxAge: expiresIn
      });
  
        return nextResponse;
      }
    }
    return NextResponse.json({message: "Unauthorized"}, {status: 401});
  }
