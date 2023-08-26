"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { jobInfo } from "@/interfaces/interface";
import { collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import SubmitToast from "./submitToast";

export default function ClientInteractions({jobData}: {jobData: {userId: string, job: jobInfo}}) {


    
    const { job, userId} = jobData;
    const currentUser = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [currentPR, setCurrentPR] = useState<any>();
    const [showToast, setShowToast] = useState(false);
    const [inReview, setInReview] = useState(job.inReview);

    function toggleModal() {
        setShowModal(!showModal);
    }

    function handleToast() {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
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
    }


    async function handleSubmitWork() {
        if(currentUser && currentPR) {
            const uid = currentUser.uid;
            const jobRef = doc(db, "users", job.publisher.userId , "userJobs", job.id);
            const userRef = doc(db, "users", job.publisher.userId);
            const messageRef = collection(userRef, "messages");


            const submittedWork = {
                type: "PR",
                PR_title: currentPR.title,
                PR_url: currentPR._links.html.href,
            }
            
            //updating job document
            const updateJob = updateDoc(jobRef, {
                inReview: true,
                'assignee.submittedWork': submittedWork
            });

            //sending message to employer
            const messageData = {
                type: "submittedWork",
                submittedWork,
                job: {
                    title: job.title,
                    id: job.id,
                },
                employee: {
                    id: uid,
                    name: currentUser.providerData[0].displayName || currentUser.displayName,
                    image: currentUser.photoURL
                },
                viewed: false,
                createdAt: serverTimestamp(),

            }
            const setMessage =  setDoc(doc(messageRef), messageData);


            //avoiding waterfalls
            await Promise.all([updateJob, setMessage]);
        }

        toggleModal();
        setInReview(true);
        handleToast();
    

    }

    return (
        <>
        <div className="d-flex justify-content-center align-items-center" style={{marginTop: '50px'}}>
        {
        inReview ? 
            <button className="btn btn-primary btn-lg text-white" disabled onClick={checkPR}>Your work is in review</button>
        :
            <button className="btn btn-primary btn-lg text-white" onClick={checkPR}>Submit work</button>
        }
        </div>

        {showToast && <SubmitToast />}
        
        
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
                                        <p>In order to request a review of your work, you have to submit a pull request to your employer&apos;s repository on Github</p>
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
                                        <button type="button" className="btn btn-primary text-white" onClick={handleSubmitWork}>Submit</button>
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