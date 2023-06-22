import Link from "next/link";
import { cookies } from  'next/headers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

export default function Navbar() {
    const cookieStore = cookies()
    const userImage = cookieStore.get('user-image')?.value;
    const userName = cookieStore.get('user-name')?.value;
    const token = cookieStore.get('loggedIn');
    console.log(userImage);

    if(!token) {
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
                <img
                  src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                  height="15"
                  alt="MDB Logo"
                  loading="lazy"
                />
              </a>
            
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" href="/employer">Offer jobs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/coder">Explore</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">Login</Link>
                </li>
              </ul>
            
            </div>
         

            
            <div className="d-flex align-items-center">
      
            </div>
            
          </div>
          
        </nav>
      )
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
                <img
                  src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                  height="15"
                  alt="MDB Logo"
                  loading="lazy"
                />
              </a>
            
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" href="/employer">Offer jobs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/coder">Explore</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">Logout</Link>
                </li>
              </ul>
            
            </div>
         

            
            <div className="d-flex align-items-center">
            

                <h1 className="mx-4 fs">{userName}</h1>
                <p className=""></p>

              
            <div className="dropdown">
                <a
                  className="text-reset me-3 dropdown-toggle hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faBell} style={{height:"25px", color:"green"}}/>
                  <span className="badge rounded-pill badge-notification bg-danger">1</span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="#">Some news</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">Another news</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </li>
                </ul>
            </div>
    
                <div className="dropdown">
                    <a
                    className="dropdown-toggle d-flex align-items-center hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuAvatar"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                    >
                    <img
                        src={userImage}
                        className="rounded-circle"
                        height="25"
                        alt="User image"
                        loading="lazy"
                    />
                    </a>
                    <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuAvatar"
                    >
                    <li>
                        <a className="dropdown-item" href="#">My profile</a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">Settings</a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">Logout</a>
                    </li>
                    </ul>
                </div>
            </div>
            
          </div>
          
        </nav>
    )
}