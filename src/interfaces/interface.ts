import { NextRequest } from "next/server";

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
    applications: applicationData[];
    assignee?: {
        name:string,
        image:string,
        id: string,
    };
    publisher: {
        name: string,
        image: string,
        userId: string,
        githubURL?: string
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
        name: string,
        githubURL?:string,
    },
    coverletter: string,
    id: string,
    jobId: string,
    interview?: boolean
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
            userId: string,
            githubURL?: string
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
            name: string,
            githubURL?:string,
        },
        coverletter: string,
        jobId: string,
        interview?: boolean
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

export interface encryptedData {
    iv: string,
    encryptedData: string
}
export interface CustomNextRequest extends NextRequest {
    uid?: string;
  }

export interface userApplication {
    coverletter: string,
    job: {
        id: string,
        title: string
    },
    id: string
}

export interface githubData {
    name: string,
    followers: number,
    following: number,
    location: string,
    email: string,
    url: string,
    image: string
}

export interface userData {
    githubData: {
        name: string,
        followers: number,
        following: number,
        location: string,
        email: string,
        url: string,
        image: string
    },
    userApplication: {
        coverletter: string,
        job: {
            id: string,
            title: string
        },
        interview?: boolean,
        id: string
    }[],
    jobInfo: {
        createdAt: Date;
        description: string;
        payment: string;
        period: string;
        //applications: applicationData[]
        publisher: {
            name: string,
            image: string,
            userId: string,
            githubURL?: string
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
}

export interface userCookieData {
    name:string,
    image:string,
    url: string,
}