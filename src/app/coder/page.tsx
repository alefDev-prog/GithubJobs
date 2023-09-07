"use client";

import firebase_app, { db } from "@/firebase/config";
import 'firebase/firestore';
import { Firestore, collection, collectionGroup, getDocs, limit, onSnapshot, orderBy, query, startAfter, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import JobItem from "./components/jobItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { jobInfo } from "@/interfaces/interface";
import { useAuth } from "@/context/AuthContext";
import hasApplied from "./utils/checkApplied";


export default function Explorer() {
    const [items, setItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [lastItem, setLastItem] = useState<any>(null);

    const currentUser = useAuth();
    

    
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collectionGroup(db, "userJobs"), orderBy("createdAt", "desc"), limit(10), where("assignee", "==", null)),
            (snapshot) => {
                const newItems = snapshot.docs.map((doc) => {
                    const docData = doc.data() as jobInfo;
                    if(hasApplied(docData, currentUser?.uid)) return;

                    else return{id: doc.id, ...doc.data()}

                });

                if(newItems.length < 20) setHasMore(false);
                setItems(newItems);
                setLastItem(newItems.length > 0 ? newItems[newItems.length - 1] : null);
            }
        );
    
        return () => unsubscribe();
    }, []);
    

    async function fetchJobs() {
        try {
            let ordered;

            if(lastItem) {
                console.log("here");
                ordered = query(collectionGroup(db, "userJobs"),
                orderBy("createdAt"),
                startAfter(lastItem.createdAt),
                limit(2),
                where("assignee", "==", null));
            }
            else {
                ordered = query(collectionGroup(db, "userJobs"),
                orderBy("createdAt"),
                limit(2), 
                where("assignee", "==", null));
            }

            const orderedDocs = await getDocs(ordered);
            const newItems = orderedDocs.docs.map((doc) => {
                const docData = doc.data() as jobInfo;
                if(hasApplied(docData, currentUser?.uid)) return;

                else return{id: doc.id, ...doc.data()}

            });
            setItems((prevItems) => [...prevItems, ...newItems]);
            setLastItem(newItems.length > 0 ? newItems[newItems.length - 1] : null);
            if (orderedDocs.docs.length < 2) setHasMore(false);

        } catch (error) {
            console.log(error);
        }
    }

    
    

    return (
        <>
            <main className="container">
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchJobs}
                    hasMore={hasMore}
                    loader={<p>Loading...</p>}
                    endMessage={<p>No more data to load.</p>}
                >
                    
                    {items.map((item, index) => (
                        <JobItem key={index} info={item}/>
                    ))}
                    
                </InfiniteScroll>
            
            </main>
        </>
        
    )
}