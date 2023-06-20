"use client";

import firebase_app, { db } from "@/firebase/config";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestore } from "firebase-admin";
import { collection, collectionGroup, getDocs, limit, onSnapshot, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

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
            const jobCollection = collectionGroup(db, "userJobs");

            const ordered = query(collectionGroup(db, "userJobs"), orderBy("createdAt"), limit(3));

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

    async function test() {
        const res = query(collectionGroup(db, "userJobs"));
        const querySnapshot = await getDocs(res);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
});
    }

    return (
        <>
            <button onClick={test}>Test</button>
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