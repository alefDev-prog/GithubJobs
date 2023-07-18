"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import Notification from "./notifications";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [userImage, setUserImage] = useState<string>();
    const [userName, setUserName] = useState<string>();
    const [token, setToken] = useState<boolean>();

    useEffect(() => {
     
      const userImage = Cookies.get('user-image');
      const userName = Cookies.get('user-name');
      const token = Cookies.get('loggedIn'); 
      setUserImage(userImage);
      setUserName(userName);
      token ? setToken(true) : setToken(false);
    }, [])  

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
                  <Link className="nav-link" href="/conversations">Conversations</Link>
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
                  <Link className="nav-link" href="/conversations">Conversations</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">Logout</Link>
                </li>
              </ul>
            
            </div>

            <Notification userImage={userImage} userName={userName} />
         
    
          </div>
          
        </nav>
    )
}