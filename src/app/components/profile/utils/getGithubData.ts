import { Octokit } from "@octokit/rest";
import { cookies } from "next/headers";

export default async function getGithubData() {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value;

    if(!accessToken) return null;

    const octokit = new Octokit({ 
        auth: accessToken
    });

    const response = await octokit.rest.users.getAuthenticated();
    return response.data;
}