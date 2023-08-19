import verifyAuth from "@/authMiddleware/auth";
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
        const response = await octokit.request('POST /repos/{owner}/{repo}/forks', {
            owner,
            repo,
        })
    } catch(error) {
        return new Error("Could not fork");
    }


    return NextResponse.json({accessToken})

}