import verifyAuth from "@/authMiddleware/auth";
import { adminSDK } from "@/firebase/admin";
import { jobInfo } from "@/interfaces/interface";
import { Octokit } from "@octokit/rest";
import { cookies } from "next/headers";

export default async function getJob_Octokit(jobId:string): Promise<{userId:string, job: jobInfo, octokit: Octokit} | Error> {

    const userId = await verifyAuth();
    const db = adminSDK.firestore();

    let job: jobInfo = {} as jobInfo;
    if(typeof userId === "string" && typeof jobId === "string") {
      try {
        const userJobsQuerySnapshot = await db.collectionGroup('userJobs').where('id', '==', jobId).get();
        if (userJobsQuerySnapshot.empty) {
            return new Error("No job");
        }
        else {
            job = userJobsQuerySnapshot.docs[0].data() as jobInfo

            //get octokit
            const cookieStore = cookies()
            const accessToken = cookieStore.get('accessToken')?.value;
            if(!accessToken) return new Error("No accesstoken");
            const octokit = new Octokit({ 
                auth: accessToken
            });

            return {userId, job, octokit};
        }
      
      } catch (error) {
        return error as Error;
      }
    }
    else return new Error("Not logged in");
  
}