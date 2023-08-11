import verifyAuth from "@/authMiddleware/auth";
import { adminSDK } from "@/firebase/admin";
import { userChat } from "@/interfaces/interface";

export default async function getConverations(): Promise<userChat[]|Error> {
    

    try {
     

        const uid = await verifyAuth();

        if(typeof uid === "string") {
            const db = adminSDK.firestore();
            const userRef = db.collection('users').doc(uid);
            const chatCollection = userRef.collection("userChats");

            let chatArray = [] as userChat[]

            await chatCollection.get().then(snapshot => {
                snapshot.forEach(doc => {
                    chatArray.push(doc.data() as userChat);
                });
            });

            return chatArray;
        }
        else return new Error("Not logged in");
    }
    catch(error) {
        return new Error("Error");
    }
}