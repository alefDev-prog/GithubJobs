

import Message from "./components/messages";
import loadMess from "./utils/loadMessages";

export default async function Messages() {
    const messages = await loadMess();
    if(messages instanceof Error) return <h1>Error</h1>
    if(!messages) return <h1></h1> 
    
    return (
        <div className="container mt-3">
            <h1 className="mb-4 text-primary">Messages</h1>
            <div>
            {messages.map((message:any, index:number) => (
                <Message message={message} key={index} />
            ))}
            </div>
            
        </div>
        );


    
    
}