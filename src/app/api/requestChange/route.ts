import verifyAuth from "@/authMiddleware/auth";
import { adminSDK } from "@/firebase/admin";
import { jobInfo } from "@/interfaces/interface";
import { Octokit } from "@octokit/rest";
import { serverTimestamp } from "firebase/firestore";
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
        const pull_number_string = job.assignee?.submittedWork?.PR_url.split("/pull/")[1] as string;
        const pull_number = parseInt(pull_number_string);
     

        
        const { data: reviews } = await octokit.pulls.listReviews({
            owner,
            repo,
            pull_number,
        });

        let latestChangeRequest = undefined;

        reviews.forEach((review => {
            if(review.user?.login === owner && review.state === "CHANGES_REQUESTED") latestChangeRequest = review;
        }))

        if(!latestChangeRequest) {
            return NextResponse.json({message: "You have not required any changes for this PR in Github"}, {status: 404});
        }

        //change inReview to false, nullify submittedWork and send message to employee
        const db = adminSDK.firestore();
        const docRef = db.collection("users").doc(auth).collection("userJobs").doc(job.id);
        const messageRef = db.collection("users").doc(job.assignee?.id as string).collection("messages");
        const messageContent = {
            type: "changes_requested",
                job: {
                    title: job.title,
                    id: job.id,
                    publisher: job.publisher,
                    submittedWork: job.assignee?.submittedWork
                },
                viewed: false,
                createdAt: serverTimestamp()
        }

        const updateJob = docRef.update({
            inReview: false,
            "assignee.submittedWork": null
        });


        return NextResponse.json(latestChangeRequest);

        

    } catch(error) {
        console.log(error);
        return NextResponse.json({message: "Could not check PR"}, {status: 500});
    }

}