import getJob from "@/globalUtils/getJob";

export default async function Job({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined}}) {
    
    const jobId = searchParams?.id as string;

    try {
        const job = await getJob(jobId);
        console.log(job);
    } catch(error) {
        console.log(error);
    }

    return (
        <h1>Job</h1>
    )
    

}