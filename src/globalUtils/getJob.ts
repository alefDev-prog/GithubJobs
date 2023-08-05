import verifyAuth from "@/authMiddleware/auth";
import { adminSDK } from "@/firebase/admin";
import { jobInfo } from "@/interfaces/interface";

export default async function getJob(jobId:string): Promise<jobInfo | Error> {

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
          return job;
        }
      
      } catch (error) {
        return error as Error;
      }
    }
    else return new Error("Not logged in");
  
}