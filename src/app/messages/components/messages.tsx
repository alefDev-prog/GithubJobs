"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Message({message, key}: {message:any, key:number}) {

  const currentUser = useAuth();
  const {push} = useRouter();
  function handleClick() {
   
    if(!message.viewed && currentUser?.uid) {
      const messagesRef = doc(db, "users", currentUser?.uid, "messages", message.id);
      updateDoc(messagesRef, {viewed: true});

    }

    if(message.type === "Application") {
      push(`/request?id=${message.job.id}|${message.applicationId}`);
    }

    if(message.type === "Assigned") {
      
    }
  }
  
  return (
      <div
          className={`card mb-3 ${message.viewed ? 'viewed' : 'bg-info-subtle'}`}
          onClick={handleClick} key={key}>
            {message.type === "Application" && 
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <Image
                    src={message.applicant.image}
                    alt={message.applicant.name}
                    className="img-fluid rounded-circle"
                    height={100}
                    width={100}
                  />
                </div>
                <div className="col-md-10">
                    <>
                      <p className="card-text-body-emphasis">Job application</p>
                      <p className="card-text">Job: {message.job.title}</p>
                      <p className="card-text">Applicant: {message.applicant.name}</p>
                    </>
                </div>
              </div>
            </div>
          }
          {message.type === "Assigned" &&
            <div className="card-body">
            <div className="row">
              <div className="col-md-2">
                <Image
                  src={message.job.publisher.image}
                  alt={message.job.publisher.name}
                  className="img-fluid rounded-circle"
                  height={100}
                  width={100}
                />
              </div>
              <div className="col-md-10">
                  <>
                    <p className="card-text-body-emphasis">You have been assigned: <strong className="text-primary">{message.job.title}</strong></p>
                  </>
              </div>
            </div>
          </div>
          }


          {message.type === "submittedWork" &&
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <Image
                    src={message.employee.image}
                    alt="employee image"
                    className="img-fluid rounded-circle"
                    height={100}
                    width={100}
                  />
                </div>
                <div className="col-md-10">
                    <>
                      <p className="card-text-body-emphasis">Work has been submitted for <strong className="text-primary">{message.job.title}</strong></p>
                    </>
                </div>
              </div>
            </div>
          }
        </div>
  )
}