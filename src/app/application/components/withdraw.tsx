"use client";

import { db } from "@/firebase/config";
import { applicationData, jobInfo } from "@/interfaces/interface";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Withdraw({job, app}: {job: jobInfo, app: applicationData}) {
    const {push} = useRouter();
    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }
    async function handleWithdraw() {

        await Promise.all([
            deleteDoc(doc(db, "users", app.applicant.id, "userApplications", app.id)),
            updateDoc(doc(db, "users", job.publisher.userId, "userJobs", job.id), {
              applications: arrayRemove(app)
            })
        ]);

        push("/");

    }


    return (
        <>
        <button type="button" className="btn btn-danger text-white" onClick={toggleModal}>Withdraw Application</button>
            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>

                    <div className="modal d-block">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm withdrawal</h5>
                                    <button type="button" className="btn-close" onClick={toggleModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to withdraw your application?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                                    <button type="button" className="btn btn-danger text-white" onClick={handleWithdraw}>Withdraw</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
        
    )
}