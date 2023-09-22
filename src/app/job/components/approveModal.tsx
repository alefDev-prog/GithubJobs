"use client";

import { Dispatch, useReducer } from "react";
import { actionKind, initialValues, jobControlAction, jobControlState, reducer } from "./reducer/reducer";
import { useAuth } from "@/context/AuthContext";
import { collection, deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { jobInfo } from "@/interfaces/interface";
import { useRouter } from "next/navigation";


export default function ApproveModal({state, dispatch, job}: {state: jobControlState, dispatch: Dispatch<jobControlAction>, job: jobInfo}) {

    const currentUser = useAuth();
    const {push} = useRouter();
 
    function handleClose() {
        dispatch({type: actionKind.CLOSE_APPROVE_MODAL});
    }

    async function approve() {
        if(currentUser && job.assignee) {
            
            const assigneeRef = doc(db, "users", job.assignee?.id);
            const messageRef = collection(assigneeRef, "messages");
            const messageDoc = doc(messageRef);



            //deleting job from employer's userJobs and employee's currentJobs and sending message to employee
            const messageContent = {
                type: "work_approved",
                job: {
                    title: job.title,
                    id: job.id,
                    publisher: job.publisher
                },
                viewed: false,
                createdAt: serverTimestamp(),
                id: messageDoc.id
            }

            try {
                const deletingForEmployer = deleteDoc(doc(db, "users", currentUser.uid, "userJobs", job.id))
                const deletingForEmployee = deleteDoc(doc(db, "users", job.assignee.id, "currentJobs", job.id))
                const sendingMess = setDoc(messageDoc, messageContent);
    
                await Promise.all([deletingForEmployer, deletingForEmployee, sendingMess]);

                push("/");

            } catch(error) {
                console.log(error);
            }
            


        }
    }

    return (

        <>
            <div className="modal-backdrop fade show"></div>

            <div className="modal d-block">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Approve</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>An approval of the work would result in the job being terminated.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                            <button type="button" className="btn btn-primary text-white" onClick={approve}>Approve</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}