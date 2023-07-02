"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";

export default function Notification({userName, userImage}: {userName: string|undefined, userImage: string|undefined}) {

    const currentUser = useAuth();
    const userId = currentUser?.user?.uid;
    useEffect(() => {
        
        if(userId) {
            const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
                const userDoc = doc.data();
                const messages = userDoc?.messages;
                console.log(messages);

            });

            return(() => unsub())
        }
        

          
    }, []);

    return(

        <div className="d-flex align-items-center">
            

                <h1 className="mx-4 fs">{userName}</h1>

              
            <div>
                <FontAwesomeIcon icon={faBell} style={{height:"25px", color:"green"}}/>
                <span className="badge rounded-pill badge-notification bg-danger">1</span>

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