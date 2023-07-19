"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import Link from "next/link";

export default function Notification({userName, userImage}: {userName: string|undefined, userImage: string|undefined}) {

    const currentUser = useAuth();
    const userId = currentUser?.uid;


    const [mess, setMess] = useState(0);
    useEffect(() => {
        
        if(userId) {

            const unsub = onSnapshot(
                query(collection(db, "users", userId, "messages")),
                (querySnapshot) => {
                  let counter = 0;
                  querySnapshot.forEach((doc) => {
                    const message = doc.data();
                    if (!message.viewed) {
                      counter++;
                    }
                  });
                  setMess(counter);
                }
              );

            return(() => unsub())
        }
        

          
    }, [currentUser]);

    return(

        <div className="d-flex align-items-center">
            

                <h1 className="mx-4 fs">{userName}</h1>

                <Link href="/messages">
                    <div role='button' className="mx-2">
                        <FontAwesomeIcon icon={faBell} style={{height:"25px", color:"green"}}/>
                        <span className="badge rounded-pill badge-notification bg-danger">{mess}</span>

                    </div>
                </Link>
                
                <Link href='/profile'>
                    <div role='button' className="mx-2">
                        <img
                                src={userImage}
                                className="rounded-circle"
                                height="25"
                                alt="User image"
                                loading="lazy"
                            />
                    </div>
                </Link>
                

                    
                    
            </div>
    )
}