"use client"

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { where } from "@firebase/firestore";
import { DocumentData, arrayUnion, collection, collectionGroup, doc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export default function Job() {

  const search = useSearchParams();
  const id = search.get("id");
  const currentUser = useAuth();
  

  const [currentJob, setCurrentJob] = useState<DocumentData|null>(null);
  const letter = useRef<HTMLTextAreaElement | null>(null);
    

  useEffect(() => {

    const fetchJobDocument = async () => {
      try {
        const jobQ = query(collectionGroup(db, "userJobs"), where("id", "==", id));
        const querySnapshot = await getDocs(jobQ);
        querySnapshot.forEach((doc) => {  
            const job = doc.data();
            if(job.id == id) setCurrentJob(job);
        });

      } catch(error) {
        console.log(error);
      }
    
    };

    fetchJobDocument();
  }, []);



  async function handleSubmit() {
    const userId = currentUser?.user?.uid;

    if(userId){
        console.log("here")
        const docRef = doc(db, "users", userId);
        const subCollectionRef = collection(docRef, "userApplications");
        const jobDoc = doc(subCollectionRef);
        

        const applicantInfo = {
          jobId: currentJob?.id,
          coverletter: letter.current?.value,
        }


        const applicationInfo = {
          jobId: currentJob?.id,
          applicant: {
            name: currentUser.user?.displayName,
            image: currentUser.user?.photoURL,
            id: currentUser.user?.uid,
          },
          coverletter: letter.current?.value,
        }

        const messageInfo = {
          type: "Application",
          job: {
            title: currentJob?.title,
            id: currentJob?.id
          },
          applicant: {
            name: currentUser.user?.displayName,
            image: currentUser.user?.photoURL,
            id: currentUser.user?.uid,
          }

        }

        if(currentJob) {
          const userRef = doc(db, "users", currentJob.publisher.userId);
          const jobRef = doc(db, "users", currentJob.publisher.userId, "userJobs", currentJob.id);
          const promises = [
            setDoc(jobDoc, applicantInfo),
            updateDoc(jobRef, {applications: arrayUnion(applicationInfo)}),
            updateDoc(userRef, {messages: arrayUnion(messageInfo)})
          ];

          await Promise.all(promises);

        }

       
        
       
        /*
        //setting info for applicant
        await setDoc(jobDoc, applicantInfo);

        //insert into job-Document
        if(currentJob) {
          
          await updateDoc(jobRef, {applications: arrayUnion(applicationInfo)});
        }
        */
        
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