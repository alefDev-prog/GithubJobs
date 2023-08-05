import verifyAuth from "@/authMiddleware/auth";
import { adminSDK } from "@/firebase/admin";
import { jobInfo } from "@/interfaces/interface";
import Form from "./components/form";
import getJob from "@/globalUtils/getJob";



export default async function Job({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined}}) {
  
  const jobId = searchParams?.id as string;

  const job = await getJob(jobId);
  if (job instanceof Error) return <h1>Error</h1>

  return <Form currentJob={job} />

  
  
    


}