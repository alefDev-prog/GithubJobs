import getJob from "@/globalUtils/getJob";
import Image from "next/image";
import Link from "next/link";
import Remove from "./components/remove";

export default async function Job({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined}}) {
    
    const jobId = searchParams?.id as string;

    
    const job = await getJob(jobId);
    if(job instanceof Error) return <h1>Error</h1>

    return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center mb-4 text-primary">{job.title}</h1>
              <div className="card card-body">
                <h4>Description</h4>
                <p className="ms-5 mt-4">{job.description}</p>
              </div>
              
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
              <ul className="list-group">
                <li className="list-group-item">Payment: {job.payment}</li>
                <li className="list-group-item">Period: {job.period}</li>
                <li className="list-group-item">Salary: ${job.salary}</li>
                <Remove job={job} />
              </ul>
              
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Repository Info</h5>
                  <p className="card-text">Name: {job.repository.name}</p>
                  <p className="card-text">Language: {job.repository.language}</p>
                  <p className="card-text">Stars: {job.repository.stargazers_count}</p>
                  <Link href={job.repository.html_url} className="btn btn-primary text-white">Go to Repository</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12">
              <h2 className="text-center mb-4">Applications</h2>
              {job.applications.length > 0 ? (
                job.applications.map((application, index) => (
                  <Link href={{pathname:"/request", query:{id: `${job.id}|${application.id}`}}} key={index} className="text-decoration-none text-body">
                    <div className="card mt-3" >
                    <div className="card-body">
                      <Image src={application.applicant.image} className="img-fluid rounded-circle d-inline" alt="Applicant" height={70} width={70}/>
                      <h5 className="card-title">{application.applicant.name}</h5>
                      <p className="card-text">{application.coverletter}</p>
                    </div>
                  </div>
                  </Link>
                  
                ))
              ) : (
                <p className="text-center">There are no applications for this job yet.</p>
              )}
            </div>
          </div>
        </div>
      );
    

}