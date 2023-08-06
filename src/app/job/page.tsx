import getJob from "@/globalUtils/getJob";

export default async function Job({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined}}) {
    
    const jobId = searchParams?.id as string;

    
    const job = await getJob(jobId);
    if(job instanceof Error) return <h1>Error</h1>

    return (
        <h1>Job</h1>
    )
    

}