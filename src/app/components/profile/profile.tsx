import { githubData, jobInfo, userApplication } from "@/interfaces/interface";
import verifyAuth from "@/authMiddleware/auth";
import getData from "./utils/getUserData";
import Logout from "./components/logout";
import Image from "next/image";
import Link from "next/link";


export default async function Profile() {


    const uid = await verifyAuth();

    if(typeof uid ==="string") {
        const userData = await getData(uid) as {
            userJobsData: jobInfo[],
            userApplicationsData: userApplication[],
            githubData: githubData
        };
        console.log(userData.githubData.followers);
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
            {userData.userJobsData.slice(0, 5).map((job, index) => (
                <div className="card mt-3 flex-grow-1" key={index}>
                    <div className="card-body">
                        <h5 className="card-title text-primary">{job.title}</h5>
                        <p className="card-text">Description: {job.description.substring(0, 150)}</p>
                        <p className="card-text">Payment: {job.payment}</p>
                        <p className="card-text">Period: {job.period}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="col-lg-3 col-md-12 mt-3 mb-3 border bg-secondary rounded">
            <h3>Job Applications</h3>
            {userData.userApplicationsData.slice(0, 5).map((application, index) => (
                <div className="card mt-3 flex-grow-1" key={index}>
                    <div className="card-body">
                        <h5 className="card-title text-primary">{application.job.title}</h5>
                        <p className="card-text">Cover letter: {application.coverletter.substring(0,100)}... <a href="#">Read more</a></p>
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>
        )
    }

    else return (
        <Logout />
    )

    
}