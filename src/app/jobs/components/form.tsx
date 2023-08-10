"use client";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { jobInfo } from "@/interfaces/interface";
import { arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRef} from "react";
import Image from "next/image";


export default function Form({currentJob, githubURL}: {currentJob: jobInfo, githubURL: string}) {

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
                githubURL: githubURL
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
                    applicationId: jobDoc.id
        
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
          <div className="card p-4 bg-secondary">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="text-primary">{currentJob.title}</h1>
              <div className="d-flex align-items-center" style={{marginTop: "-30px"}}>
                <Link href={currentJob.publisher.githubURL || '#'}  className="link-underline-primary me-4">
                  <h4 className="text-primary">{currentJob.publisher.name}</h4>
                </Link>

                <Image src={currentJob.publisher.image} alt={currentJob.publisher.name} className="rounded-circle mr-2" width={50} height={50} />
                
              </div>
            </div>
            <p className="lead">{currentJob.description}</p>
            <ul className="list-unstyled">
              <li>Period: {currentJob.period}</li>
              <li>Payment: {currentJob.payment}</li>
              <li>Salary: ${currentJob.salary}</li>
            </ul>
            <textarea className="form-control mb-3" rows={5} placeholder="Write your cover letter" ref={letter}></textarea>
            <button onClick={handleSubmit} className="btn btn-primary text-white">Submit</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
    
    


}