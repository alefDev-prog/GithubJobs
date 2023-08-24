"use client";

import { jobInfo } from "@/interfaces/interface";
import Link from "next/link";
import { useState } from "react";

export default function ClientInteractions({jobData}: {jobData: {userId: string, job: jobInfo}}) {


    
    const { job, userId} = jobData;

    const [showModal, setShowModal] = useState(false);
    const [currentPR, setCurrentPR] = useState<any>({});

    function toggleModal() {
        setShowModal(!showModal);
    }

    async function checkPR() {
        const forkAction = await fetch("/api/checkPR", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job)
        });
        const data = await forkAction.json();
        setCurrentPR(data);
        toggleModal();
        console.log(data);
    }

    return (
        <>
        <div className="d-flex justify-content-center align-items-center" style={{marginTop: '50px'}}>
            <button className="btn btn-primary btn-lg text-white" onClick={checkPR}>Submit work</button>
        </div>
        
        
        {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>

                    <div className="modal d-block">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">


                                {Object.keys(currentPR).length === 0 ? (
                                <>
                                    <div className="modal-header">
                                        <h5 className="modal-title text-danger">No Pull Request (PR) found for this repository</h5>
                                        <button type="button" className="btn-close" onClick={toggleModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>In order to request a review of your work, you have to submit a pull request to your employer's repository on Github</p>
                                    </div>
                                </>

                                )
                                :
                                (
                                <>
                                    <div className="modal-header">
                                        <h5 className="modal-title">Confirm submittal of work</h5>
                                        <button type="button" className="btn-close" onClick={toggleModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Are you sure you want to hand in your work for review?</p>
                                        <div className="d-inline">Your latest PR:    
                                            <Link href={currentPR._links.html.href} target="blank" className="link-underline-primary">
                                            <h6 className="text-primary d-inline ms-2">{currentPR.title}</h6>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                                        <button type="button" className="btn btn-primary text-white">Submit</button>
                                    </div>
                                </>
                                    
                                )}
                               



                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
        
        
    )

}