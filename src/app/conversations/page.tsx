"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { userChat } from "@/interfaces/interface";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Conversation from "./components/conversation";


export default function Conversations() {

    const userId = useAuth()?.uid;
    
    const [conversations, setConversations] = useState<userChat[]>();


    useEffect(() => {
       

            async function getData() {
                if(userId) {
                    const userRef = doc(db, "users", userId);
                    const conversationCollection = collection(userRef, "userChats");
                    const conversationSnap = await getDocs(conversationCollection);
                    const conversationList = conversationSnap.docs.map(doc => doc.data() as userChat);
                    setConversations(conversationList)
                }
            }

            getData();
            
    
    }, [userId]);


    if(conversations) {
        return (
        
            <div className="container">
                <h1 className="mt-4 mb-3">My Conversations</h1>
                <div className="d-flex flex-column">
                    {conversations.map((conversation) => (
                        <Conversation conversation={conversation} key={conversation.chatId}/>
                    ))}
                </div>
                </div>
        
        )
    }

    else return (
        <h1>Loading...</h1>
    )
   
}