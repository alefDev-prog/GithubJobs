

import Conversation from "./components/conversation";
import getConverations from "./utils/getConversations";


export default async function Conversations() {

    
    const conversations = await getConverations();
    if(conversations instanceof Error) return <h1>Error</h1>

   
        return (
        
            <div className="container">
                <h1 className="mt-4 mb-3">My Conversations</h1>
                <div className="d-flex flex-column">
                    {conversations.map((conversation) => (
                        <Conversation conversation={conversation} key={conversation.chatId}/>
                    ))}
                </div>
            </div>
        
        )
    

   
}