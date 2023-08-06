import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import getJob from "@/globalUtils/getJob";
import { applicationData, jobInfo, requestObject } from "@/interfaces/interface";
import { arrayUnion, collection, doc, getDoc,setDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default async function interview(jobData: {jobInfo: jobInfo, applicationData: applicationData}, currentUser: any) {
   
    //const currentUser = useAuth();
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
               
                await setDoc(doc(db, "chats", combinedId), {messages: [initialMessage]});
            }
            else {
                
                await updateDoc(doc(db, "chats", combinedId), {
                    messages: arrayUnion(initialMessage)
                });
            }

            //sending user to chatt
            return combinedId
            //push(`/chat?chatid=${combinedId}`)



        } catch(error) {
            console.log(error);
        }
    }

}