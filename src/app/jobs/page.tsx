import verifyAuth from "@/authMiddleware/auth";
import { adminSDK } from "@/firebase/admin";
import { jobInfo } from "@/interfaces/interface";
import Form from "./components/form";
import getJob from "@/globalUtils/getJob";
import getCookieData from "@/globalUtils/getCookieData";



export default async function Job({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined}}) {
  
  const jobId = searchParams?.id as string;

  const jobData = await getJob(jobId);
  if(jobData instanceof Error) return <h1>Error</h1>
  const job = jobData.job;


  const githubURL = getCookieData().url as string;

  return <Form currentJob={job} githubURL={githubURL}/>

  
  
    


}