import verifyAuth from "@/authMiddleware/auth";
import { Octokit } from "@octokit/rest";
import { cookies } from "next/headers";

export default async function fetchRepositories() {

    try {
     

            const uid = await verifyAuth();

            if(typeof uid === "string") {
                const cookieStore = cookies()
                const accessToken = cookieStore.get('accessToken')?.value;

                if(!accessToken) return new Error("No accessToken");

                const octokit = new Octokit({ 
                    auth: accessToken
                });
                const response = await octokit.repos.listForAuthenticatedUser({visibility:"all"});
                const repos = response.data;

                const filteredRepos = repos.map(repo => {
                    return {
                        name: repo.name,
                        private: repo.private,
                        url: repo.html_url

                    }
                });

                return filteredRepos;
            }
            
         
    } catch(error) {
        return error;
    }
    
}