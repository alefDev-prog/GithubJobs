

import verifyAuth from "@/authMiddleware/auth";
import { adminSDK } from "@/firebase/admin";


import { jobInfo } from "@/interfaces/interface";
import { where } from "@firebase/firestore";
import Form from "./components/form";



export default async function Job({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined}}) {
  
  const userId = await verifyAuth();

  //fetching job
  const jobId = searchParams?.id;
  const db = adminSDK.firestore();


  let job: jobInfo = {} as jobInfo;
  if(typeof userId === "string" && typeof jobId === "string") {
    try {
      const userJobsQuerySnapshot = await db.collectionGroup('userJobs').where('id', '==', jobId).get();
      if (userJobsQuerySnapshot.empty) {
        return (
          <h1>Error</h1>
        )
      }
      else {
        job = userJobsQuerySnapshot.docs[0].data() as jobInfo
      }
    
    } catch (error) {
      console.log(error);
    }
  }

  return <Form currentJob={job} />

  
  
    


}