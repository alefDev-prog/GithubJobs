"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { messageArray } from "@/types/types";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./components/input";
import { friend } from "@/interfaces/interface";
import Image from "next/image";

export default function Chat() {

    const search = useSearchParams();
    const chatId = search.get("chatid");
    const [messages, setMessages] = useState<messageArray>();
    const [friend, setFriend] = useState<friend>();

    const currentUser = useAuth();
    const currentId = currentUser?.user?.uid;


    useEffect(() => {

        //fetching "friend" information
        async function getChat() {
            if(chatId && currentId) {
                const chatSnap = await getDoc(doc(db, "users", currentId, "userChats", chatId));
                chatSnap.exists() && setFriend(chatSnap.data().friend as friend);
            }
        }
        getChat();
        

        //fetching messages realtime
        if(chatId && currentId) {
            const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
                doc.exists() && setMessages(doc.data().messages as messageArray);
            });
            //clean up
            return () => unsub();
        }
        
    }, [chatId, currentId]);
    
    if (messages) {
        return (
          <div className="container-fluid h-100">
            <div className="row h-100">
              <div className="col-md-12">
                {/* The "messaging-window" */}
                <div
                  className="overflow-auto h-100"
                  style={{ background: '#f5f5f5', padding: '20px' }}
                >
                  {messages.map((item, index) => {
                    if ('message' in item) {
                      if (item.currentId === currentId) {
                        // Message from current user
                        return (
                          <div key={index} className="text-end mb-3">
                            <div className="d-flex justify-content-end">
                              <div className="bg-primary text-white rounded p-2">
                                <div className="d-flex align-items-center">
                                  <p className="mb-0">{item.message}</p>
                                  </div>
                                  </div>
                                {currentUser?.user?.photoURL && (
                                <div className="ml-2">
                                    <Image
                                    src={currentUser?.user?.photoURL}
                                    alt="Current User"
                                    width={40}
                                    height={40}
                                    className="rounded-circle"
                                    />
                                </div>
                                )}
                              
                            </div>
                          </div>
                        );
                      } else {
                        // Message from other user
                        return (
                          <div key={index} className="text-start mb-3">
                            <div className="d-flex">
                              {friend && (
                                <div className="mr-2">
                                  <Image
                                    src={friend.image}
                                    alt={friend.name}
                                    width={40}
                                    height={40}
                                    className="rounded-circle"
                                  />
                                </div>
                              )}
                              <div className="bg-secondary text-white rounded p-2">
                                <p className="mb-0">{item.message}</p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    } else if ('job' in item) {
                      // Interview message
                      return (
                        <div key={index} className="d-flex justify-content-center mb-3">
                          <div className="bg-info text-white rounded p-2 w-100">
                            <h5>{item.job?.title}</h5>
                            <p>Repo Name: {item.job?.repoName}</p>
                            <p>Repo URL: {item.job?.repoURL}</p>
                            <p>Salary: {item.job?.salary}</p>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
    
                {/* Message input */}
                <Input chatId={chatId} currentId={currentId} />
              </div>
            </div>
          </div>
        );
      } else {
        return <h1>Loading...</h1>;
      }
   
}

/*

1. make each message have a max-width, after which the text continues on a new row.
2. make the chat have a max-width, I do not want it all over the screen if the screen is big
3. make it so that the actual page never gets bigger than 100% of height. Therefore you need
to make the actual chat-window scrollable, and not the whole page
*/