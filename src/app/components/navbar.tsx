import Link from "next/link";
import Notification from "./notifications";
import { cookies } from 'next/headers'; // Import cookies
import countMes from "./utils/countMessage";
import Image from "next/image";


export default async function Navbar() {
    
  const nextCookies = cookies();
  const userImage = nextCookies.get('user-image');
  const userName = nextCookies.get('user-name');
  const token = nextCookies.get('loggedIn'); 
  let messageCount: number = 0;

  if(token) {


    messageCount = await countMes();
    
  }
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
        <div className="container-fluid">
      
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

      
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              {/* Room for logo */}
            </a>
          
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" href="/employer">Offer jobs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/coder">Explore</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/conversations">Conversations</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/login">Logout</Link>
              </li>
            </ul>
          
          </div>

          {token && <Notification userImage={userImage} userName={userName} messageCount={messageCount}/>}
      
  
        </div>
        
      </nav>
    )
  
}