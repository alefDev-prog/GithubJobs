import { adminSDK } from "@/firebase/admin";
import { githubData, jobInfo, userApplication } from "@/interfaces/interface";

export default async function getData(uid: string) {
    try {
        if(typeof uid === "string") {
            const db = adminSDK.firestore();
            const userRef = db.collection('users').doc(uid);

            const userJobsRef = userRef.collection('userJobs');
            const userApplicationsRef = userRef.collection('userApplications');

            let userJobsData:jobInfo[]  = [];
            let userApplicationsData:userApplication[]  = [];
            let githubData:any;

            let userJobsPromise = userJobsRef.get().then(snapshot => {
                snapshot.forEach(doc => {
                    userJobsData.push(doc.data() as jobInfo);
                });
            });
            
            let userApplicationsPromise = userApplicationsRef.get().then(snapshot => {
                snapshot.forEach(doc => {
                    userApplicationsData.push(doc.data() as userApplication);
                });
            });
            
            let githubDocPromise = userRef.get().then(snapshot => {githubData = snapshot.data()});
            
            await Promise.all([userJobsPromise, userApplicationsPromise, githubDocPromise]);
            
            
            //const githubData = githubDoc.data();
            return {userJobsData, userApplicationsData, githubData}
            
        }



    } catch(error) {
        return error;
    }
}