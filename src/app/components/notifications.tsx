"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import Link from "next/link";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Image from "next/image";

export default function Notification({userName, userImage, messageCount}: {userName: RequestCookie|undefined, userImage: RequestCookie|undefined, messageCount: number}) {

    const currentUser = useAuth();
    const userId = currentUser?.uid;


    const [mess, setMess] = useState(messageCount);
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

    if(userName && userImage?.value) {
    return(

        <div className="d-flex align-items-center">
            

                <h1 className="mx-4 fs">{userName?.value}</h1>

                <Link href="/messages">
                    <div role='button' className="mx-2">
                        <FontAwesomeIcon icon={faBell} style={{height:"25px"}} className="text-primary"/>
                        <span className="badge rounded-circle badge-notification bg-danger">{mess}</span>

                    </div>
                </Link>
                
                <Link href='/profile'>
                    <div role='button' className="mx-2">
                        <Image 
                        src={userImage?.value}
                        height={25}
                        width={25}
                        alt="User image"
                        className="rounded-circle"/>
                        
                    </div>
                </Link>
                

                    
                    
            </div>
    )

    } else return (
        <h1>Error</h1>
    )
}