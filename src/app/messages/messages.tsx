"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export default function Message({message}: {message:any}) {

  const currentUser = useAuth();
  function handleClick() {
    if(!message.viewed && currentUser?.user?.uid) {
      const messagesRef = doc(db, "users", currentUser?.user?.uid, "messages", message.id);
      updateDoc(messagesRef, {viewed: true});
    }
  }
  
  return (
      <div
          className={`card mb-3 ${message.viewed ? 'viewed' : 'bg-info-subtle'}`}
          onClick={handleClick}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-2">
                <img
                  src={message.applicant.image}
                  alt={message.applicant.name}
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="col-md-10">
                <h5 className="card-title">{message.job.title}</h5>
                <p className="card-text">Applicant: {message.applicant.name}</p>
                <p className="card-text">Type: {message.type}</p>
                <p className="card-text">Job ID: {message.job.id}</p>
                <p className="card-text">Applicant ID: {message.applicant.id}</p>
                {/* Display more properties as needed */}
              </div>
            </div>
          </div>
        </div>
  )
}