"use client";

import { userChat } from "@/interfaces/interface";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Conversation({conversation}: {conversation: userChat}) {

    const {push} = useRouter();

    function handleClick() {
        push(`/chat?chatid=${conversation.chatId}`);
    }



    return (
        <div
            className="card conversation-card mb-4"
            key={conversation.chatId}
            onClick={handleClick}
            role="button"
        >
            <div className="row g-0">
            <div className="col-md-1">
                <Image
                src={conversation.friend.image}
                className="img-fluid rounded-start conversation-image"
                alt={conversation.friend.name}
                height={70}
                width={70}
                />
            </div>
            <div className="col-md-9">
                <div className="card-body">
                <h5 className="card-title">{conversation.friend.name}</h5>
                </div>
            </div>
            </div>
        </div>
    )
}