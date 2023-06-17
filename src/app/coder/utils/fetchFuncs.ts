import { db } from "@/firebase/config";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";


export async function postsFirstBatch() {
    const jobCollection = collection(db, "jobs");
    const ordered = query(jobCollection, orderBy("createdAt", "desc"), limit(3));
    const orderedDocs = await getDocs(ordered);
    orderedDocs.forEach((doc) => console.log(doc.data()));
}
