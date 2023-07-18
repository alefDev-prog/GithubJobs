"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { messageArray } from "@/types/types";
import { doc, onSnapshot } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./components/input";

export default function Chat() {

    const search = useSearchParams();
    const chatId = search.get("chatid");
    const [messages, setMessages] = useState<messageArray>();

    const currentUser = useAuth();
    const currentId = currentUser?.user?.uid;


    useEffect(() => {
        if(chatId) {
            const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
                doc.exists() && setMessages(doc.data().messages as messageArray);
            });
            //clean up
            return () => unsub();
        }
        
    }, [chatId]);
    
    if(messages) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {/* The "messaging-window" */}
                        {messages.map((item, index) => {
                            // Check if the message or interview
                           
                            if ("message" in item) {
                                if(item.senderId === currentId) {
                                    // Message from current user
                                    return (
                                        <div key={index} className="text-end">
                                            <p className="bg-primary text-white rounded p-2">{item.message}</p>
                                        </div>
                                    )
                                } else {
                                    // Message from other user
                                    return (
                                        <div key={index} className="text-start">
                                            <p className="bg-secondary text-white rounded p-2">{item.message}</p>
                                        </div>
                                    )
                                }
                            } else if ("job" in item) {
                                // Interview message
                                return (
                                    <div key={index} className="d-flex justify-content-center">
                                        <div className="bg-info text-white rounded p-2 w-100">
                                            <h5>{item.job?.title}</h5>
                                            <p>Repo Name: {item.job?.repoName}</p>
                                            <p>Repo URL: {item.job?.repoURL}</p>
                                            <p>Salary: {item.job?.salary}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })}
    
                        {/* Message input */}
                        <Input chatId={chatId} currentId={currentId}/>
                    </div>
                </div>
            </div>
        );
    }


    else {
        return(
            <h1>Loading...</h1>
        )
    }
    
  
   
}
