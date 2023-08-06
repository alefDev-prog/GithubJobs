
import { db } from "@/firebase/config";

import { applicationData, jobInfo } from "@/interfaces/interface";
import { arrayRemove, arrayUnion, collection, doc, getDoc,setDoc, updateDoc } from "firebase/firestore";



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

            /*
            update db to state that the applicant is being interviewed
            this is a temporary solution which firstly removes the object from array
            and then inserts a modified object.
            The final solution shall involve a subcollection of applications, rather than an array

            */

            await updateDoc(doc(db,"users", userId, "userJobs", jobData.jobInfo.id), {
                applications: arrayRemove(jobData.applicationData)
            });
            const updatedApplication = jobData.applicationData;
            updatedApplication.interview = true;
            await updateDoc(doc(db,"users", userId, "userJobs", jobData.jobInfo.id), {
                applications: arrayUnion(updatedApplication)
            });


            //update applicant's db to let them know they are being interviewed
            await updateDoc(doc(db, "users", jobData.applicationData.applicant.id, "userApplications", jobData.applicationData.id), {
                interview: true
            });




            
            return combinedId
            //push(`/chat?chatid=${combinedId}`)



        } catch(error) {
            console.log(error);
        }
    }

}