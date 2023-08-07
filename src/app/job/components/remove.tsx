"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { applicationData, jobInfo } from "@/interfaces/interface";

import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Remove({job}: {job: jobInfo}) {
    const currentUser = useAuth();
    const {push} = useRouter();
    const userId = currentUser?.uid;
    
    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }

    async function removeJob() {
        if(userId) {
        try {
            await deleteDoc(doc(db, "users", userId, "userJobs", job.id));


            //deleting applications for the job
            const deletePromises = job.applications.map((application: applicationData) => {
                const appDoc = doc(db, "users", application.applicant.id, "userApplications", application.id);
                return deleteDoc(appDoc);
            });

            await Promise.all(deletePromises);
            
            push("/");
        } catch(error) {
            console.log(error);
        }
        

        }
    }



    return (
        <div>
            <button onClick={toggleModal} className="btn-danger text-white btn rounded-0 rounded-bottom-2">Delete job</button>
    
            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
    
                    <div className="modal d-block">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Delete</h5>
                                    <button type="button" className="btn-close" onClick={toggleModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete this job?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                                    <button type="button" className="btn btn-danger text-white" onClick={removeJob}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}