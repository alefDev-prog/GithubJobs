import verifyAuth from "@/authMiddleware/auth";
import { adminSDK } from "@/firebase/admin";
import { jobInfo } from "@/interfaces/interface";
import { Octokit } from "@octokit/rest";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

    const auth = await verifyAuth();
    
    if(typeof auth !== "string") return NextResponse.json({message: "Unauthorized"}, {status: 401})

    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value;
    const octokit = new Octokit({ 
        auth: accessToken
    });
    const job = await req.json() as jobInfo;

    
    try {
        const url = new URL(job.repository.html_url);
        const [ , owner, repo ] = url.pathname.split('/');
        const response = await octokit.rest.repos.createFork({
            owner,
            repo,
        });
        const db = adminSDK.firestore();
        const docRef = db.collection("users").doc(job.publisher.userId).collection("userJobs").doc(job.id);
        await docRef.update({
            'assignee.forked': true 
        });
        

        
    
       return NextResponse.json(response);
    } catch(error) {
        console.log(error);
        return NextResponse.json({message: "Could not fork"}, {status: 500});
    }

}