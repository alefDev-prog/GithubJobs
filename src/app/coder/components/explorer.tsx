"use client";

import firebase_app, { db } from "@/firebase/config";
import 'firebase/firestore';
import { Firestore, collection, collectionGroup, getDocs, limit, onSnapshot, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";


export default function Explorer() {
    const [items, setItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [lastItem, setLastItem] = useState<any>(null);


    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collectionGroup(db, "userJobs"), orderBy("createdAt", "desc"), limit(20)),
            (snapshot) => {
                const newItems = snapshot.docs.map((doc) => doc.data());
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
                limit(2));
            }
            else {
                ordered = query(collectionGroup(db, "userJobs"),
                orderBy("createdAt"),
                limit(2));
            }

            const orderedDocs = await getDocs(ordered);
            const newItems = orderedDocs.docs.map((doc) => doc.data());
            console.log(newItems);
            setItems((prevItems) => [...prevItems, ...newItems]);
            setLastItem(newItems.length > 0 ? newItems[newItems.length - 1] : null);
            if (orderedDocs.docs.length < 2) setHasMore(false);

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
                    {items.map((item, index) => (
                        <li key={index}>{item.title}</li>
                    ))}
                    </ul>
                </InfiniteScroll>
            
            </div>
        </>
        
    )
}