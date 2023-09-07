import { jobInfo } from "@/interfaces/interface";

export default function hasApplied(job: jobInfo, uid: string|undefined) {

    const application = job.applications.find(app => {
        console.log(app.applicant.id)
        return app.applicant.id === uid;
    });

    if(application) return true;
    return false;
}