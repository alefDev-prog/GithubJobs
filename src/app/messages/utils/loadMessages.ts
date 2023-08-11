import verifyAuth from "@/authMiddleware/auth";
import { adminSDK } from "@/firebase/admin";

export default async function loadMess(): Promise<any[]|Error> {
    

    try {
     

        const uid = await verifyAuth();

        if(typeof uid === "string") {
            const db = adminSDK.firestore();
            const userRef = db.collection('users').doc(uid);
            const messCollection = userRef.collection("messages");

            let messArray:any[] = [];

            await messCollection.orderBy('createdAt', 'desc').get().then(snapshot => {
                snapshot.forEach(doc => {
                    messArray.push(doc.data());
                });
            });

            return messArray;
        }
        else return new Error("Not logged in");
    }
    catch(error) {
        return new Error("Error");
    }
}