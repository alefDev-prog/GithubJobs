import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  
    const loggedInCookie = request.cookies.get('loggedIn');
    const {origin} = request.nextUrl;
    

    if(!loggedInCookie && (request.url == origin+"/employer"
    || request.url == origin+"/coder"
    || request.url == origin+"/profile"
    || request.url == origin+"/jobs"
    || request.url == origin+"/profile")) {
        return NextResponse.redirect(origin);
    }
}