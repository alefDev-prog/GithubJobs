"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Request() {
    const currentUser = useAuth();
    const search = useSearchParams();
    const id = search.get("id");


    const [jobData, setJobData] = useState<any>(null);
  
    useEffect(() => {
      async function getData() {
        const userId = currentUser?.user?.uid;
        const jobId = id?.split("|")[0];
        const appId = id?.split("|")[1];
        console.log(jobId);
      
        if (userId && jobId) {
          const jobDoc = doc(db, "users", userId, "userJobs", jobId);
          const userJobSnap = await getDoc(jobDoc);
          const jobInfo = userJobSnap.data();
         
          let applicationData;
  
          
          jobInfo?.applications.forEach((app: any) => {
              if(app.id === appId) {
                  applicationData = app;
                  return;
              }
          });

          setJobData({jobInfo, applicationData});
        }   

  
        
      }
  
      getData();
    }, [currentUser]);

    if(jobData) {
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
                            <img src={jobData.applicationData.applicant.image} className="mr-3 rounded-circle" alt="Applicant Image" width="64" height="64" />
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
                    <button className="btn btn-primary">Start Interview</button>
                    </div>
                </div>
                </div>
            
        )
    }
    else {
        return (
            <p>Loading...</p>
        )
    }

    
}