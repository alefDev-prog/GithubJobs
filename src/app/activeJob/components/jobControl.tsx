"use client";

import { jobInfo } from "@/interfaces/interface";
import { Octokit } from "@octokit/rest";
import { useState } from "react";

export default function ClientInteractions({jobData}: {jobData: {userId: string, job: jobInfo}}) {


    
    const { job, userId} = jobData;


    const [forked, setForked] = useState(job.assignee?.forked)

    async function fork() {
        const forkAction = await fetch("/api/fork", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job)
        });
        if(forkAction.ok) {
            setForked(true);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{marginTop: '50px'}}>
        {!forked && 
            <button className="btn btn-primary btn-lg mr-3 text-white" onClick={fork}>Fork</button>
        }
        <button className="btn btn-primary btn-lg text-white">Request review</button>
    </div>
        
    )

}