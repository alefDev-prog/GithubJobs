"use client";

import { db } from "@/firebase/config";
import { messages } from "@/types/types";
import { doc, onSnapshot } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Chat() {

    const search = useSearchParams();
    const chatId = search.get("chatid");
    const [messages, setMessages] = useState<messages>();


    useEffect(() => {
        if(chatId) {
            
            const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
                doc.exists() && setMessages(doc.data());
            });


            //clean up
            return () => unsub();
        }
        
    }, []);

    return (
        <button onClick={() => console.log(messages)}>Test</button>
    )
}
