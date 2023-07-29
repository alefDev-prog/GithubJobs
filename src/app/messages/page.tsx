"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { DocumentData, collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Message from "./components/messages";

export default function Messages() {
    const currentUser = useAuth();

    
    
    const [messages, setMessages] = useState<DocumentData | undefined | null>(null);

    useEffect(() => {

        async function getData() {
            const userId = currentUser?.uid;
        
            
            try {

                const docRef = doc(db, "users", userId? userId : "");
             
            
                const messagesRef = collection(docRef, "messages");
                const messagesSnap = await getDocs(messagesRef);
                const messagesData = messagesSnap.docs.map((doc) => doc.data());
                setMessages(messagesData);
               
            } catch(err) {
                console.log(err);
            }
            
        }

        getData();
        
    }, [currentUser]);

    if(messages) {
        return (
            <div className="container mt-3">
              <h1 className="mb-4">Messages</h1>
              <div className="overflow-auto" style={{ maxHeight: '600px' }}>
                {messages.map((message:any, index:number) => (
                  <Message message={message} key={index} />
                ))}
              </div>
            </div>
          );
    }

    else {
        return (
            <h1>Loading...</h1>
        )
    }
    
}