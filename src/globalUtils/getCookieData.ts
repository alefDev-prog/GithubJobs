import { userCookieData } from "@/interfaces/interface";
import { cookies } from "next/headers";

export default function getCookieData(): userCookieData {
    const cookieStore = cookies()
    const userCookie = cookieStore.get('userData')?.value as string;
    const userData = JSON.parse(userCookie);

    return userData;
}