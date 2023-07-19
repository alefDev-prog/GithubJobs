"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { applicationData, jobInfo, requestObject } from "@/interfaces/interface";
import { arrayUnion, collection, doc, getDoc,setDoc, updateDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Request() {
    const currentUser = useAuth();
    const search = useSearchParams();
    const id = search.get("id");
    const {push} = useRouter();


    const [jobData, setJobData] = useState<requestObject>();
  
    useEffect(() => {
      async function getData() {
        const userId = currentUser?.uid;
        const jobId = id?.split("|")[0];
        const appId = id?.split("|")[1];
        console.log(jobId);
      
        if (userId && jobId) {
          const jobDoc = doc(db, "users", userId, "userJobs", jobId);
          const userJobSnap = await getDoc(jobDoc);
          const jobInfo = userJobSnap.data() as jobInfo;
         
          let applicationData: applicationData;
  
          
          jobInfo?.applications.forEach((app: applicationData) => {
              if(app.id === appId) {
                  applicationData = app;
                  setJobData({jobInfo, applicationData});
                  return;
              }
          });

          
        }   

      }
  
      getData();
    }, [currentUser]);



    async function interview() {
        const applicantId = jobData?.applicationData.applicant.id;
        const userId: string|undefined = currentUser?.uid;
        let combinedId = "";

        if(userId && applicantId) {
            combinedId = userId > applicantId
            ? userId + applicantId
            : applicantId + userId


            try {
                const coversationRes = await getDoc(doc(db, "chats", combinedId));
                //const userChatRes = await getDoc(doc(db, "users", userId, "userChats", combinedId));
                const userRef = doc(db, "users", userId); 
                const otherUserRef = doc(db, "users", applicantId);
                
                //Insert into userChats
                const chatCollection = collection(userRef, "userChats");
                const chatData = {
                    friend: {
                        name: jobData.applicationData.applicant.name,
                        image: jobData.applicationData.applicant.image
                    },
                    chatId: coversationRes.id
                }
                setDoc(doc(chatCollection, combinedId), chatData);

                //Insert into other user's userChats
                const otherChatCollection = collection(otherUserRef, "userChats");
                const otherChatData = {
                    friend: {
                        name: currentUser?.displayName || currentUser?.providerData[0].displayName,
                        image: currentUser?.photoURL
                    },
                    chatId: coversationRes.id
                }
                setDoc(doc(otherChatCollection, combinedId), otherChatData);


                //initial message (conversation-initializator)
                const initialMessage = {
                    type: "interview",
                    job: {
                        title: jobData.jobInfo.title,
                        salary: jobData.jobInfo.salary,
                        repoURL: jobData.jobInfo.repository.html_url,
                        repoName: jobData.jobInfo.repository.name
                    },
                }

                //check if chat already exists
                if(!coversationRes.exists()) {
                    console.log("hey")
                    await setDoc(doc(db, "chats", combinedId), {messages: [initialMessage]});
                }
                else {
                    console.log("no")
                    await updateDoc(doc(db, "chats", combinedId), {
                        messages: arrayUnion(initialMessage)
                    });
                }

                //sending user to chatt
                push(`/chat?chatid=${combinedId}`)



            } catch(error) {
                console.log(error);
            }
        }

    }
    

    if(jobData) {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                    <div className="card mb-3">
                        <div className="card-body">
                        <h2>Job Information</h2>
                        <hr className="mb-4" />
                        <h4 className="card-title">{jobData.jobInfo.title}</h4>
                        <p className="card-text">{jobData.jobInfo.description}</p>
                        <p><strong>Payment:</strong> {jobData.jobInfo.payment}</p>
                        <p><strong>Period:</strong> {jobData.jobInfo.period}</p>
                        <p><strong>Publisher:</strong> {jobData.jobInfo.publisher.name}</p>
                        <p><strong>Repository:</strong> <a href={jobData.jobInfo.repository.html_url} target="_blank">{jobData.jobInfo.repository.name}</a></p>
                        <p className="mb-0"><strong>Language:</strong> {jobData.jobInfo.repository.language}</p>
                        <p><strong>Salary:</strong> ${jobData.jobInfo.salary}</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="card mb-3">
                        <div className="card-body">
                        <h2>Applicant Information</h2>
                        <hr className="mb-4" />
                        <div className="media">
                            <img src={jobData.applicationData.applicant.image} className="mr-3 rounded-circle" alt="Applicant Image" width="64" height="64" />
                            <div className="media-body">
                            <h5 className="mt-0">{jobData.applicationData.applicant.name}</h5>
                            <p>{jobData.applicationData.coverletter}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <button className="btn btn-primary" onClick={interview}>Start Interview</button>
                    </div>
                </div>
                </div>
            
        )
    }
    else {
        return (
            <p>Loading...</p>
        )
    }

    
}