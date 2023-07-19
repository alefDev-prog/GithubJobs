export interface repoInfo {
    name: string,
    html_url: string,
    private: boolean,
    language: string,
    stargazers_count: number
}

export interface jobInfo {
    createdAt: Date;
    description: string;
    payment: string;
    period: string;
    applications: applicationData[]
    publisher: {
        name: string,
        image: string,
        userId: string
    };
    
    repository: {
        html_url: string;
        language: string;
        name: string;
        private: boolean;
        stargazers_count: number;
    };
    
    salary: string;
    title: string;
    id: string
}

export interface userData {
    userApplications: object,
    userJobs: object
}

export interface applicationData {
    applicant: {
        id: string,
        image: string,
        name: string
    },
    coverletter: string,
    id: string,
    jobId: string
}

export interface requestObject {
    jobInfo: {
        createdAt: Date;
        description: string;
        payment: string;
        period: string;
        publisher: {
            name: string,
            image: string,
            userId: string
        };
        
        repository: {
            html_url: string;
            language: string;
            name: string;
            private: boolean;
            stargazers_count: number;
        };
        
        salary: string;
        title: string;
        id: string
    },
    applicationData: {
        applicant: {
            id: string,
            image: string,
            name: string
        },
        coverletter: string,
        jobId: string
    }
    
}


export interface userChat {
    chatId: string,
    friend: {
        image: string,
        name: string,
    }
}

export interface friend {
    image: string,
    name: string
}

