import getChatId from "@/globalUtils/getChatId";
import Link from "next/link";
import ClientInteractions from "./components/clientSide";
import getJob from "@/globalUtils/getJob";

export default async function activeJob({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined}}) {
    
    
    const jobId = searchParams?.jobId as string
    
    const jobData = await getJob(jobId);
    if(jobData instanceof Error) return <h1>Error</h1>
    const {job, userId} = jobData;


    const chatId = getChatId(userId, job.publisher.userId);


    


    return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center mb-4 text-primary">{job.title}</h1>
              <div className="card card-body">
                <h4>Description</h4>
                <p className="ms-5 mt-4">{job.description}</p>
              </div>
              
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
              <ul className="list-group">
                <li className="list-group-item">Payment: {job.payment}</li>
                <li className="list-group-item">Period: {job.period}</li>
                <li className="list-group-item">Salary: ${job.salary}</li> 
                <div>

                  <Link href={`/chat?chatid=${chatId}`} >
                    <button className="btn-primary text-white btn rounded-0 rounded-bottom-2">Chat with employer</button>
                  </Link>
                    
                </div>  
              </ul>
         
             
              
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Repository Info</h5>
                  <p className="card-text">Name: {job.repository.name}</p>
                  <p className="card-text">Language: {job.repository.language}</p>
                  <p className="card-text">Stars: {job.repository.stargazers_count}</p>
                  <Link href={job.repository.html_url} className="btn btn-primary text-white">Go to Repository</Link>
                </div>
              </div>
            </div>
          </div>
          <ClientInteractions jobData={jobData} />
        </div>
    )
    
}