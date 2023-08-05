import { githubData, jobInfo, userApplication } from "@/interfaces/interface";
import verifyAuth from "@/authMiddleware/auth";
import getData from "./utils/getUserData";
import Logout from "./components/logout";
import Image from "next/image";
import Link from "next/link";
import JobCard from "./components/jobcard";
import ApplicationCard from "./components/applicationcard";


export default async function Profile() {


    const uid = await verifyAuth();

    if(typeof uid ==="string") {
        const userData = await getData(uid) as {
            userJobsData: jobInfo[],
            userApplicationsData: userApplication[],
            githubData: githubData
        };
        //console.log(userData.githubData.followers);
        return (
            <div className="container-fluid">
    <div className="row justify-content-evenly">
        <div className="col-lg-3 col-md-6 col-sm-12 mt-3 mb-3 ">
            <div className="card flex-grow-1">
                <div className="d-flex align-items-start">
                    <Image src={userData.githubData.image} alt="Profile" width={200} height={200} />
                </div>
                <div className="card-body">
                    <h3 className="card-title text-primary">{userData.githubData.name}</h3>
                    <p className="card-text">Followers: {userData.githubData.followers}</p>
                    <p className="card-text">Following: {userData.githubData.following}</p>
                    <p className="card-text">Location: {userData.githubData.location}</p>
                    <p className="card-text">Email: {userData.githubData.email}</p>
                    <Link href={userData.githubData.url} className="btn btn-primary d-block text-white">Github Profile</Link>
                    <Logout />
                </div>
            </div>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12 mt-3 mb-3 border bg-secondary rounded">
            <h3>Jobs Published</h3>
            <JobCard jobs={userData.userJobsData} />
        </div>
        <div className="col-lg-3 col-md-12 mt-3 mb-3 border bg-secondary rounded">
            <h3>Job Applications</h3>
            <ApplicationCard apps={userData.userApplicationsData} />
        </div>
    </div>
</div>
        )
    }

    else return (
        <Logout />
    )

    
}