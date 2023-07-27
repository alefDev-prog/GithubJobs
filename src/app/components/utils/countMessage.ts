import verifyAuth from "@/authMiddleware/auth";
import { adminSDK } from "@/firebase/admin";

export default async function countMes() {
    const uid = await verifyAuth();
    if(typeof uid === "string") {
      if(adminSDK.apps.length === 0) {
        adminSDK.initializeApp();
      }
      const db = adminSDK.firestore();
      const userRef = db.collection('users').doc(uid);
      let mesCounter: number = 0;
      const userMesRef = userRef.collection('messages');
      await userMesRef.get().then(snapshot => {
        snapshot.forEach(doc => {
        const message = doc.data();
            if (!message.viewed) {
                mesCounter++;
            }
        
        });
      });
      return mesCounter;
    }

    return 0;
    
}