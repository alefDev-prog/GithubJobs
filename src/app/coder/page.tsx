"use client";

import { db } from "@/firebase/config";
import { collection, getDocs, limit, onSnapshot, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

export default function Coder() {
    const [items, setItems] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [lastItem, setLastItem] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "jobs"), orderBy("createdAt"), limit(3)),
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
            const jobCollection = collection(db, "jobs");

            const ordered = query(
                jobCollection,
                orderBy("createdAt"),
                startAfter(lastItem ? lastItem.createdAt : null),
                limit(2)
            );

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

    /*
    async function fetchJobs() {
        
        try {
            const jobCollection = collection(db, "jobs");

            const lastItem = items[items.length - 1];
            const ordered = query(jobCollection, limit(3),
                orderBy("createdAt"),
                startAfter(lastItem ? lastItem.createdAt : null));

            const orderedDocs = await getDocs(ordered);
            const newItems = orderedDocs.docs.map(doc => doc.data());
            console.log(newItems);
            setItems(prevItems => [...prevItems, ...newItems]);
            if(orderedDocs.docs.length < 1) setHasMore(false);
            orderedDocs.forEach((doc) => console.log(doc.data()));

        } catch(error) {
            console.log(error);
        }
    }
    */


    return (
        <>
            <h1>Coder</h1>
            <button onClick={() => console.log(hasMore)}>Test</button>
            <div>
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