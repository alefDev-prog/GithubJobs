import verifyAuth from "@/authMiddleware/auth";
import { repoInfo } from "@/interfaces/interface";
import { Octokit } from "@octokit/rest";
import { cookies } from "next/headers";

export default async function fetchRepositories()  {

    try {
     

            const uid = await verifyAuth();

            if(typeof uid === "string") {
                const cookieStore = cookies()
                const accessToken = cookieStore.get('accessToken')?.value;

                if(!accessToken) return null;

                const octokit = new Octokit({ 
                    auth: accessToken
                });
                const response = await octokit.repos.listForAuthenticatedUser({visibility:"all"});
                const repos = response.data;

                const filteredRepos = repos.map(repo => {
                    return {
                        name: repo.name,
                        private: repo.private,
                        html_url: repo.html_url,
                        language: repo.language,
                        stargazers_count: repo.stargazers_count

                    } as repoInfo
                });

                return filteredRepos;
            }
            
         
    } catch(error) {
        return null
    }
    
    
}