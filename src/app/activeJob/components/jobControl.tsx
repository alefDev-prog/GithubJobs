"use client";

import { jobInfo } from "@/interfaces/interface";
import { Octokit } from "@octokit/rest";
import { useState } from "react";

export default function ClientInteractions({jobData}: {jobData: {userId: string, job: jobInfo}}) {


    
    const { job, userId} = jobData;



    async function checkPR() {
        const forkAction = await fetch("/api/checkPR", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job)
        });
        const data = await forkAction.json();
        console.log(data);
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{marginTop: '50px'}}>
            <button className="btn btn-primary btn-lg text-white" onClick={checkPR}>Request review</button>
        </div>
        
    )

}