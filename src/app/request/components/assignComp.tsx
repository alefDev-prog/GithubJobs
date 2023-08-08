"use client";

import { db } from "@/firebase/config";
import { applicationData, jobInfo } from "@/interfaces/interface";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Assign({jobData}: {jobData: {jobInfo: jobInfo, applicationData: applicationData}}){
    const {push} = useRouter();


    async function handleClick() {

        const applicantRef = doc(db, "users", jobData.applicationData.applicant.id);
                    
        const currentJobsRef = collection(applicantRef, "currentJobs");
        const messagesRef = collection(applicantRef, "messages");
        const messagesDoc = doc(messagesRef);
        const applicantDoc = doc(currentJobsRef);

        const messageData = {
            type: "Assigned",
            job: {
                title: jobData.jobInfo.title,
                id: jobData.jobInfo.id,
                publisher: jobData.jobInfo.publisher
            },
            viewed: false,
            id: applicantDoc.id
        }
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
            })
            ])
        



        push("/");
    }


    return (
        <button className="btn btn-primary text-white" onClick={handleClick}>Assign this applicant</button>
    )
}