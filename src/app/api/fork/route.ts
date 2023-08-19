import verifyAuth from "@/authMiddleware/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

    const auth = await verifyAuth();
    if(typeof auth !== "string") return NextResponse.json({message: "Unauthorized"}, {status: 401})

    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')?.value;


    return NextResponse.json({accessToken})

}