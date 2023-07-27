"use client";

import { db } from "@/firebase/config";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FormEvent } from "react";

export default function Input({chatId, currentId}:{chatId:string|null, currentId: string|undefined}) {



    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const message = (form.elements[0] as HTMLInputElement).value;
        if(chatId && currentId) {
            updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    currentId,
                    message,
                    createdAt: Timestamp.now()
                    })
            });
        }

    }


    return (
        <div className="d-fixed bottom-0 w-100 bg-light p-3">
            <form onSubmit={submit}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Enter message..." />
                    <button className="btn btn-primary text-white" type="submit" id="button-addon2">Send</button>
                </div>
            </form>
        </div>
    )
}