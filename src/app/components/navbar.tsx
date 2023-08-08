import Link from "next/link";
import Notification from "./notifications";
import { cookies } from 'next/headers'; // Import cookies
import countMes from "./utils/countMessage";
import Image from "next/image";


export default async function Navbar() {
  const cookieStore = cookies()
  const userCookie = cookieStore.get('userData')?.value as string;
  
  const userData = JSON.parse(userCookie);
  const userImage = userData.image;
  const userName = userData.name;

 
  const token = cookieStore.get('loggedIn'); 
  

  let messageCount: number = 0;

  if(token) {


    messageCount = await countMes();
    
  }
    return (
      <nav className="navbar navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand mt-2 mt-lg-0" href="#">
      {/* Room for logo */}
    </a>
    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <li className="nav-item">
        <Link className="nav-link" href="/employer">Offer jobs</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/coder">Explore</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/conversations">Conversations</Link>
      </li>
    </ul>
    {token && <Notification userImage={userImage} userName={userName} messageCount={messageCount} />}
  </div>
</nav>

    

    )
  
}