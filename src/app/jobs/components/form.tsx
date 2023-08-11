"use client";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { jobInfo } from "@/interfaces/interface";
import { arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useRef} from "react";
export default function Form({currentJob}: {currentJob: jobInfo}) {

const letter = useRef<HTMLTextAreaElement | null>(null);

    const currentUser = useAuth();
    async function handleSubmit() {

        //currentUserID
        const userId = currentUser?.uid;

        //employerId
        const employerId = currentJob?.publisher.userId;

        if(userId && employerId){
            

            const docRef = doc(db, "users", userId);
            const subCollectionRef = collection(docRef, "userApplications");
            const jobDoc = doc(subCollectionRef);
            
            //ref to employer
            const employerRef = doc(db, "users", employerId);
            
            

            const applicantInfo = {
            job: {
              id: currentJob.id,
              title: currentJob.title
            },
            coverletter: letter.current?.value,
            id: jobDoc.id
            }


            const applicationInfo = {
            jobId: currentJob?.id,
            applicant: {
                name: currentUser.displayName || currentUser.providerData[0].displayName,
                image: currentUser.photoURL,
                id: currentUser.uid,
            },
            coverletter: letter.current?.value,
            id: jobDoc.id
            }

            

            if(currentJob) {
            
                const jobRef = doc(db, "users", currentJob.publisher.userId, "userJobs", currentJob.id);
                const messagesRef = collection(employerRef, "messages");
                const messagesDoc = doc(messagesRef);


                const messageInfo = {
                    type: "Application",
                    job: {
                    title: currentJob?.title,
                    id: currentJob?.id
                    },
                    applicant: {
                    name: currentUser.displayName || currentUser.providerData[0].displayName,
                    image: currentUser.photoURL,
                    id: currentUser.uid,
                    },
                    viewed: false,
                    id: messagesDoc.id,
                    applicationId: jobDoc.id,
                    createdAt: serverTimestamp()
        
                }

                const promises = [
                    setDoc(jobDoc, applicantInfo),
                    updateDoc(jobRef, {applications: arrayUnion(applicationInfo)}),
                    setDoc(messagesDoc, messageInfo),
                ];

                await Promise.all(promises);

            }
            
        }
    }

  
  return (
    <div className="container mt-4">
    {currentJob ? (
      <div className="card p-4 bg-light">
        <h1 className="display-4">{currentJob.title}</h1>
        <p className="lead">{currentJob.description}</p>
        <ul className="list-unstyled">
          <li>Period: {currentJob.period}</li>
          <li>Payment: {currentJob.payment}</li>
          <li>Salary: ${currentJob.salary}</li>
        </ul>
        <textarea className="form-control mb-3" rows={5} placeholder="Write your cover letter" ref={letter}></textarea>
        <button onClick={handleSubmit} className="btn btn-success" style={{ backgroundColor: "#14A100" }}>Submit</button>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  )


}