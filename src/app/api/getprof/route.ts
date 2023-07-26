import authMiddleware from "@/authMiddleware/auth";
import { adminSDK } from "@/firebase/admin";
import { jobInfo, userApplication } from "@/interfaces/interface";
import { auth } from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";



if(adminSDK.apps.length === 0) {
    adminSDK.initializeApp();
}

export async function GET(req: any) {
    

    const sessionCookie = req.cookies.get("serverCookie");
    console.log(sessionCookie);
    

    // Ensure sessionCookie and its value exists
    if (!sessionCookie || !sessionCookie.value) {
        return NextResponse.json({mess: "No cookie", value: sessionCookie});
    }
    
    // Use sessionCookie.value, which is a string, instead of the whole sessionCookie object

    //The original cookie needs to be modified because it contains quotation marks which ruin the verification
    const modifiedCookie = sessionCookie.value.substring(1, sessionCookie.value.length-1);


    const {uid} = await auth().verifySessionCookie(modifiedCookie, true);
    if (!uid) {
        return  NextResponse.json("invalid cookie");
    }
    try {
        if(typeof uid === "string") {
            const db = adminSDK.firestore();
            const userRef = db.collection('users').doc(uid);

            const userJobsRef = userRef.collection('userJobs');
            const userApplicationsRef = userRef.collection('userApplications');

            let userJobsData:jobInfo[]  = [];
            let userApplicationsData:userApplication[]  = [];

            await userJobsRef.get().then(snapshot => {
                snapshot.forEach(doc => {
                  userJobsData.push(doc.data() as jobInfo);
                });
              });

            await userApplicationsRef.get().then(snapshot => {
                snapshot.forEach(doc => {
                    userApplicationsData.push(doc.data() as userApplication);
                });
            });
            return NextResponse.json({userJobsData, userApplicationsData});
            
        }



    } catch(error) {
        return NextResponse.json({mes:"err"})
    }


}