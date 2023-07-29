import { jobInfo, userApplication } from "@/interfaces/interface";
import verifyAuth from "@/authMiddleware/auth";
import getData from "./utils/getUserData";
import Logout from "./components/logout";
import getGithubData from "./utils/getGithubData";

export default async function Profile() {


    const uid = await verifyAuth();

    if(typeof uid ==="string") {
        const userData = await getData(uid) as {userJobsData: jobInfo[], userApplicationsData: userApplication[]};
        console.log(await getGithubData())
        return (
            <>
    
            <h1>{userData.userApplicationsData[0]?.coverletter}</h1>
            <Logout />
            </>
    
        )
    }

    else return (
        <h1>Not logged in</h1>
    )

    
}