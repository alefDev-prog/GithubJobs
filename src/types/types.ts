interface userMessage {
    message?: string,
    senderId?: string
}

interface initialMessage {
    job?: {
        repoName: string,
        repoURL: string,
        salary: number,
        title: string,

    },
    type?: "interview"
}

export type messageInstance = (userMessage|initialMessage)
export type messageArray = (messageInstance)[];
