"use client";

import { useAuth } from '@/context/AuthContext';
import { applicationData, jobInfo } from '@/interfaces/interface';
import { useRouter } from 'next/navigation';

export default function Interview({jobData}: {jobData: {jobInfo: jobInfo, applicationData: applicationData}}) {
    const {push} = useRouter();
    const currentUser = useAuth();
    async function handleClick() {
        
        const interview = (await import('@/globalUtils/interview')).default;
        const combinedId = await interview(jobData, currentUser);
        push(`/chat?chatid=${combinedId}`)
    }

    return (
        <button className="btn btn-primary text-white" onClick={handleClick}>Start Interview</button>
    )
}