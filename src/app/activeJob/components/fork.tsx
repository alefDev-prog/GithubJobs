"use client";

import { jobInfo } from "@/interfaces/interface";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";

export default function Fork({jobData}: {jobData: {userId: string, job: jobInfo}}) {


    
    const { job, userId} = jobData;


    const [forked, setForked] = useState(job.assignee?.forked)
    const [showToast, setShowToast] = useState(false);

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
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    }

    function test() {
        setForked(true)
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    }

    return (
        <>
        <button className={`btn btn-primary btn-lg mr-3 text-white position-absolute top-0 end-0 mt-3 me-3 ${forked ? 'disabled' : ''}`}
            onClick={fork}
            title="Fork the repository"
            disabled={forked}
        >
           <FontAwesomeIcon icon={faCodeFork} />
        </button>
        {showToast && 
            <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: 5}}>
                <div className="toast show bg-primary text-white p-3" style={{fontSize: '1.5rem'}}>
                    <div className="toast-header">
                        <strong className="me-auto">Notification</strong>
                    </div>
                    <div className="toast-body">
                        Repository forked successfully!
                    </div>
                </div>
            </div>
        }
    </>
        
        
        
    )

}