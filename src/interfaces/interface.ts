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
    publisher: string;
    
    repository: {
        html_url: string;
        language: string;
        name: string;
        private: boolean;
        stargazers_count: number;
    };
    
    salary: string;
    title: string;

}