"use client";

import firebase_app, { db } from "@/firebase/config";
import 'firebase/firestore';
import { firestore } from "firebase-admin";
import { Firestore, collection, collectionGroup, getDocs, limit, onSnapshot, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { adminSDK } from "@/firebase/admin";

export default function Explorer() {
    const [items, setItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [lastItem, setLastItem] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collectionGroup(db, "userJobs"), orderBy("createdAt"), limit(3)),
            (snapshot) => {
                const newItems = snapshot.docs.map((doc) => doc.data());
                setItems(newItems);
                setLastItem(newItems[newItems.length - 1]);
            }
        );
    

        return () => unsubscribe();
    }, []);

    async function fetchJobs() {
        try {
           
            console.log(lastItem)
            const ordered = query(collectionGroup(db, "userJobs"), orderBy("createdAt"), startAfter(lastItem ? lastItem : null), limit(4));

            const orderedDocs = await getDocs(ordered);
            const newItems = orderedDocs.docs.map((doc) => doc.data());
            setItems((prevItems) => [...prevItems, ...newItems]);
            setLastItem(newItems[newItems.length - 1]);
            if (orderedDocs.docs.length < 3) setHasMore(false);
            orderedDocs.forEach((doc) => console.log(doc.data()));
        } catch (error) {
            console.log(error);
        }
    }

    
    

    return (
        <>
            <div>
                <button onClick={fetchJobs}>Test</button>
                <button onClick={() => console.log(lastItem)}>Last</button>
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchJobs}
                    hasMore={hasMore}
                    loader={<p>Loading...</p>}
                    endMessage={<p>No more data to load.</p>}
                >
                    <ul>
                    {items.map(item => (
                        <li key={item.createdAt}>{item.title}</li>
                    ))}
                    </ul>
                </InfiniteScroll>
            
            </div>
        </>
        
    )
}