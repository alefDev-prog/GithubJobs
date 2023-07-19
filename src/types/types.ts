interface userMessage {
    message?: string,
    currentId?: string
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






