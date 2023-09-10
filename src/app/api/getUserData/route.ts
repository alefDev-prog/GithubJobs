import getData from "@/app/components/profile/utils/getUserData";
import verifyAuth from "@/authMiddleware/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

    const uid = await req.json() as string;
    try {
        const userData = await getData(uid)

        return NextResponse.json(userData);
    } catch(error) {
        if(error instanceof Error) return new Error(error.message);
    }

}