
import getJob from "@/globalUtils/getJob";
import { applicationData, jobInfo} from "@/interfaces/interface";

import Image from "next/image";
import Interview from "./components/interviewComp";
import Assign from "./components/assignComp";



export default async function Request({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined}}) {
  
   


    const combinedId = searchParams?.id as string;
    const jobId = combinedId?.split("|")[0];
    const appId = combinedId?.split("|")[1];

    //Main source of information
    let jobData = {} as {jobInfo: jobInfo, applicationData: applicationData};

    const jobInfo = await getJob(jobId);
    if(jobInfo instanceof Error) {
        return <h1>Error</h1>
    }

    //filter to get to the correct application 
    let applicationData = {} as  applicationData;
    jobInfo.applications.forEach((app: applicationData) => {
        if(app.id === appId) {
            applicationData = app;
            jobData = {jobInfo, applicationData};
            return;
        }
    }); 

    
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                <div className="card mb-3">
                    <div className="card-body">
                    <h2>Job Information</h2>
                    <hr className="mb-4" />
                    <h4 className="card-title">{jobData.jobInfo.title}</h4>
                    <p className="card-text">{jobData.jobInfo.description}</p>
                    <p><strong>Payment:</strong> {jobData.jobInfo.payment}</p>
                    <p><strong>Period:</strong> {jobData.jobInfo.period}</p>
                    <p><strong>Publisher:</strong> {jobData.jobInfo.publisher.name}</p>
                    <p><strong>Repository:</strong> <a href={jobData.jobInfo.repository.html_url} target="_blank">{jobData.jobInfo.repository.name}</a></p>
                    <p className="mb-0"><strong>Language:</strong> {jobData.jobInfo.repository.language}</p>
                    <p><strong>Salary:</strong> ${jobData.jobInfo.salary}</p>
                    </div>
                </div>
                </div>
                <div className="col-md-6">
                <div className="card mb-3">
                    <div className="card-body">
                    <h2>Applicant Information</h2>
                    <hr className="mb-4" />
                    <div className="media">
                        <Image src={jobData.applicationData.applicant.image}
                        className="mr-3 rounded-circle"
                        alt="Applicant Image"
                        width={64}
                        height={64} />
                        <div className="media-body">
                        <h5 className="mt-0">{jobData.applicationData.applicant.name}</h5>
                        <p>{jobData.applicationData.coverletter}</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {!applicationData.interview === true && <Interview jobData={jobData} />}
                    {!jobData.jobInfo.assignee && <Assign jobData={jobData}/>}
                </div>
            </div>
            </div>
        
    )


    
}