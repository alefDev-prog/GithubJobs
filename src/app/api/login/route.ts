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
        const expiresIn = 60 * 60 * 24 * 13 * 1000;
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
        const reqBody = await req.json();
        const accessToken = reqBody.accessToken;
        nextResponse.cookies.set({
          name: 'accessToken',
          value: accessToken,
          httpOnly: true,
          secure: true,
          maxAge: expiresIn
      });


        //github-information about the user to DB
        const Octokit = (await import('@octokit/rest')).Octokit
        const octokit = new Octokit({ 
          auth: accessToken
        });

        const response = await octokit.rest.users.getAuthenticated();
        const userData = response.data;
        const dataToSend = {
          name: userData.name,
          followers: userData.followers,
          following: userData.following,
          location: userData.location,
          email: userData.email,
          url: userData.html_url,
          image: userData.avatar_url
        }

        const userDataCookie = {
          name: userData.name,
          image: userData.avatar_url,
          url: userData.html_url,

        }
        const userDataString = JSON.stringify(userDataCookie);
        nextResponse.cookies.set({
          name: 'userData',
          value: userDataString,
          httpOnly: true,
          secure: true,
          maxAge: expiresIn
      });


        


        const db = adminSDK.firestore();
        const userId = reqBody.uid;

        db.collection('users').doc(userId).set(dataToSend);
        return nextResponse;
      }
    }
    return NextResponse.json({message: "Unauthorized"}, {status: 401});
  }
