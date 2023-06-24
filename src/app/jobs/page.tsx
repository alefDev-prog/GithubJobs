"use client"

import { db } from "@/firebase/config";
import { where } from "@firebase/firestore";
import { DocumentData, collectionGroup, getDocs, query } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Job() {

    const search = useSearchParams();
   

    const [currentJob, setCurrentJob] = useState<DocumentData|null>(null);
    const id = search.get("id")

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

  
    return (
      <div className="container mt-4">
      {currentJob ? (
        <div className="card p-4">
          <h1 className="display-4">{currentJob.title}</h1>
          <p className="lead">{currentJob.description}</p>
          <ul className="list-unstyled">
            <li>Period: {currentJob.period}</li>
            <li>Payment: {currentJob.payment}</li>
            <li>Salary: ${currentJob.salary}</li>
          </ul>
          <textarea className="form-control mb-3" rows={5} placeholder="Write your cover letter"></textarea>
          <button className="btn btn-success" style={{ backgroundColor: "#14A100" }}>Submit</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    )


}