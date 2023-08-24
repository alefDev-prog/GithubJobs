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
    const userData = cookieStore.get('userData')?.value as string;

    const parsedUser = JSON.parse(userData);
    const [, , , userLoginName] = parsedUser.url.split('/');

    const octokit = new Octokit({ 
        auth: accessToken
    });
    const job = await req.json() as jobInfo;

    
    try {
        const url = new URL(job.repository.html_url);
        const [ , owner, repo ] = url.pathname.split('/');

        
        
        //check if there are any PR's from employee in the repo
        const PRList = await octokit.pulls.list({
            owner,
            repo
        });
        const PRarr = PRList.data;
        let latestPR = {};
        //filter to the last PR from employee
        PRarr.forEach(PR => {
            if(PR.user?.login === userLoginName) latestPR = PR;
        })


            
       return NextResponse.json(latestPR);
    } catch(error) {
        console.log(error);
        return NextResponse.json({message: "Could not check PR"}, {status: 500});
    }

}