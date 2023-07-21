import { auth } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const sessionCookie = req.cookies.get('serverCookie');
  const session = sessionCookie?.value;
  //return NextResponse.json({message: sessionCookie});

  if (!session) {
    return NextResponse.json({isLogged: false}, {status: 401});
  }
  else {
    const decodedClaims = await auth().verifySessionCookie(session, true);

    if (!decodedClaims) {
      return NextResponse.json({isLogged: false}, {status: 401});
    }
  }

  

  return NextResponse.json({isLogged: true}, {status: 200});
  
}