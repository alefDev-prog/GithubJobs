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

    if(forked === true) {
        return <h1>It is forked</h1>
    } 
    else return (
        <>
            <h1>Not forked</h1>
            <button onClick={fork}>Fork</button>
        </>
        
    )

}