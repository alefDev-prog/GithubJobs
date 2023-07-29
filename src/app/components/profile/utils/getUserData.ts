import { adminSDK } from "@/firebase/admin";
import { jobInfo, userApplication } from "@/interfaces/interface";

export default async function getData(uid: string) {
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
            return {userJobsData, userApplicationsData}
            
        }



    } catch(error) {
        return error;
    }
}