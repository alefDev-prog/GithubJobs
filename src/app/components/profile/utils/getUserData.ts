import { adminSDK } from "@/firebase/admin";
import { githubData, jobInfo, userApplication } from "@/interfaces/interface";

export default async function getData(uid: string) {
    try {
        if(typeof uid === "string") {
            const db = adminSDK.firestore();
            const userRef = db.collection('users').doc(uid);

            const userJobsRef = userRef.collection('userJobs');
            const userApplicationsRef = userRef.collection('userApplications');
            const currentJobsRef = userRef.collection('currentJobs');

            let userJobsData:jobInfo[]  = [];
            let userApplicationsData:userApplication[]  = [];
            let currentJobsData: jobInfo[] = [];
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
            let currentJobsPromise = currentJobsRef.get().then(snapshot => {
                snapshot.forEach(doc => {
                    currentJobsData.push(doc.data() as jobInfo);
                });
            });
            
            let githubDocPromise = userRef.get().then(snapshot => {githubData = snapshot.data()});
            
            await Promise.all([userJobsPromise, userApplicationsPromise,currentJobsPromise, githubDocPromise]);
            
            
            //const githubData = githubDoc.data();
            return {userJobsData, userApplicationsData, currentJobsData, githubData}
            
        }



    } catch(error) {
        if(error instanceof Error) return new Error(error.message);
    }
}