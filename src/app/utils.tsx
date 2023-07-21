import { db } from "@/firebase/config";
import { doc, getDoc,} from "firebase/firestore";


export async function fetchApplication(jobId: string, appId:string, userId: string) {
   
    const jobDoc = doc(db, "users", userId, "userJobs", jobId);
    const userJobSnap = await getDoc(jobDoc);
    const jobData = userJobSnap.data();
    let applicationData;

    
    jobData?.applications.forEach((app: any) => {
        if(app.id === appId) {
            applicationData = app;
            return;
        }
    });

    return {jobData, applicationData};

}