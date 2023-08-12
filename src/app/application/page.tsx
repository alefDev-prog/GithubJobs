import getJob from "@/globalUtils/getJob";
import { applicationData } from "@/interfaces/interface";
import Image from "next/image";
import Link from "next/link";
import Withdraw from "./components/withdraw";

export default async function Application({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined}}) {

    const jobId = searchParams?.jobId as string;
    const appId = searchParams?.appId as string;

    const jobData = await getJob(jobId);
    if(jobData instanceof Error) return <h1>Error</h1>
    const job = jobData.job;

    let application = {} as applicationData;

    job.applications.forEach(app => {
        if(app.id === appId) {
            application = app;
            return;
        }
    });





    return (
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h2>{job.title}</h2>
                </div>
                <div className="card-body">
                  <div className="my-3">
                    <h5 className="card-title text-primary mb-3">
                      Description
                    </h5>
                    <p className="card-text border-bottom pb-3">{job.description}</p>
                  </div>
                  <div className="my-3">
                    <h5 className="card-title text-primary mb-3">
                      Payment
                    </h5>
                    <p className="card-text border-bottom pb-3">{job.payment}</p>
                  </div>
                  <div className="my-3">
                    <h5 className="card-title text-primary mb-3">
                      Period
                    </h5>
                    <p className="card-text border-bottom pb-3">{job.period}</p>
                  </div>
                  <div className="my-3">
                    <h5 className="card-title text-primary mb-3">
                      Publisher
                    </h5>
                    <div className="d-flex align-items-center">
                      {job.publisher.image && (
                        <div className="mr-3" style={{ width: '50px', height: '50px' }}>
                          <Image src={job.publisher.image} alt={job.publisher.name} width={50} height={50} />
                        </div>
                      )}
                      <p className="card-text border-bottom pb-3">
                        Name: {job.publisher.name}
                      </p>
                    </div>
                  </div>
                  <div className="my-3">
                    <h5 className="card-title text-primary mb-3">
                      Repository
                    </h5>
                    <p className="card-text border-bottom pb-3">
                      Name: <Link href={job.repository.html_url}> {job.repository.name}
                      </Link>
                      <br />
                      Language: {job.repository.language}<br />
                      Stargazers: {job.repository.stargazers_count}
                    </p>
                  </div>
                  <div className="my-3">
                    <h5 className="card-title text-primary mb-3">
                      Salary
                    </h5>
                    <p className="card-text">${job.salary}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h2>Your Application</h2>
                  {application.interview === true ? (
                    <p className="bg-info text-white p-2 mt-2">Under Interview</p>
                  ) : null }
                </div>
                <div className="card-body">
                  <h5 className="card-title text-primary mb-3">
                    Cover Letter
                  </h5>
                  <p className="card-text">{application.coverletter}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              <Withdraw job={job} app={application} />
            </div>
          </div>
        </div>
      );
}