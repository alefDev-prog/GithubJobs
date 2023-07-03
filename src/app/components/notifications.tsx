"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";

export default function Notification({userName, userImage}: {userName: string|undefined, userImage: string|undefined}) {

    const currentUser = useAuth();
    const userId = currentUser?.user?.uid;


    const [mess, setMess] = useState(0);
    useEffect(() => {
        
        if(userId) {
            const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
                const userDoc = doc.data();
                const messages = userDoc?.messages;
                let counter = 0;
                if(messages) {
                    messages.forEach((mess:any) => {
                        if(mess.viewed === false) counter++;
                    })
                }
                setMess(counter);

            });

            return(() => unsub())
        }
        

          
    }, [currentUser]);

    return(

        <div className="d-flex align-items-center">
            

                <h1 className="mx-4 fs">{userName}</h1>

              
            <div>
                <FontAwesomeIcon icon={faBell} style={{height:"25px", color:"green"}}/>
                <span className="badge rounded-pill badge-notification bg-danger">{mess}</span>

            </div>

                    <img
                        src={userImage}
                        className="rounded-circle"
                        height="25"
                        alt="User image"
                        loading="lazy"
                    />
                    
            </div>
    )
}