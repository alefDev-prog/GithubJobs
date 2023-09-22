"use client";

import { db } from "@/firebase/config";
import { applicationData, jobInfo } from "@/interfaces/interface";
import { collection, deleteDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Assign({jobData}: {jobData: {jobInfo: jobInfo, applicationData: applicationData}}){
    const {push} = useRouter();


    async function handleClick() {

        const applicantRef = doc(db, "users", jobData.applicationData.applicant.id);
                    
        const currentJobsRef = collection(applicantRef, "currentJobs");
        const messagesRef = collection(applicantRef, "messages");
        const messagesDoc = doc(messagesRef);
        const applicantDoc = doc(currentJobsRef, jobData.jobInfo.id);
        const applicationDoc = doc(db, "users", jobData.applicationData.applicant.id, "userApplications", jobData.applicationData.id);

        

        const messageData = {
            type: "Assigned",
            job: {
                title: jobData.jobInfo.title,
                id: jobData.jobInfo.id,
                publisher: jobData.jobInfo.publisher
            },
            viewed: false,
            id: applicantDoc.id,
            createdAt: serverTimestamp()
        }


        /*
        1. setting currentJob for applicant
        2. sending message to applicant
        3. updating job document
        4. deleting applicant's application

        */
        await Promise.all(
            [
            setDoc(applicantDoc, jobData.jobInfo),
            setDoc(messagesDoc, messageData),
            updateDoc(doc(db, "users", jobData.jobInfo.publisher.userId, "userJobs", jobData.jobInfo.id), {
                assignee: {
                    name: jobData.applicationData.applicant.name,
                    image: jobData.applicationData.applicant.image,
                    id: jobData.applicationData.applicant.id
                }
            }),
            deleteDoc(applicationDoc)
            ])
        



        push("/");
    }


    return (
        <button className="btn btn-primary text-white" onClick={handleClick}>Assign this applicant</button>
    )
}