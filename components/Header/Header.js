"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { useAppContext } from "@/context/Context";
import { useAuthContext } from "@/context/AuthContext";
import logo from "../../public/images/logo/logo.png";
import Nav from "./Nav";
import avatar from "../../public/images/team/team-01sm.jpg";
import UserMenu from "./UserMenu";
const Header = ({ headerTransparent, headerSticky, btnClass }) => {
  const { isAuthenticated, userDetails, userData } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const { activeMobileMenu, setActiveMobileMenu } = useAppContext();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      router.push("/home");
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router, pathname]);
  console.log(userData);
  return (
    <>
      <header
        className={`rainbow-header header-default ${headerTransparent} ${headerSticky} ${
          isSticky ? "sticky" : ""
        }`}
      >
        <div className="container position-relative">
          <div className="row align-items-center row--0">
            <div className="col-lg-2 col-md-6 col-6">
              {/* <div className="logo"> */}
              <Link href="/home">
                <Image
                  className="logo-light"
                  src={logo}
                  width={95}
                  height={95}
                  alt="ChatBot Logo"
                />
              </Link>
              {/* </div> */}
            </div>

            <div className="col-lg-8 d-none d-lg-block">
              <nav className="mainmenu-nav d-none d-lg-flex justify-content-center">
                <Nav />
              </nav>
            </div>

            <div className="col-lg-2 col-md-6 col-6 position-static">
              <div className="header-right">
                {isAuthenticated && userDetails ? (
                  <div className="rbt-admin-panel account-access rbt-user-wrapper right-align-dropdown d-none d-lg-block">
                    <div className="rbt-admin-card grid-style">
                      <a className="d-flex align-items-center" href="#">
                        <div className="inner d-flex align-items-center">
                          <div className="img-box">
                            <Image src={avatar} alt="Admin" />
                          </div>
                          <div className="content">
                            <span className="title ">
                              {(userData && userData.displayName) ||
                                userDetails.user_metadata.displayName}
                            </span>

                            <p>
                              {(userData && userData.email) ||
                                userDetails.email}
                            </p>
                          </div>
                        </div>
                        <div className="icon">
                          <i className="fa-sharp fa-solid fa-chevron-down"></i>
                        </div>
                      </a>
                    </div>
                    <div className="rbt-user-menu-list-wrapper">
                      <UserMenu />
                    </div>
                  </div>
                ) : (
                  <div className="header-btn">
                    <Link className={`${btnClass}`} href="/signin">
                      <span>Get Start</span>
                    </Link>
                  </div>
                )}

                <div className="mobile-menu-bar ml--5 d-flex justify-content-end d-lg-none">
                  <div className="hamberger">
                    <button
                      className="hamberger-button"
                      onClick={() => setActiveMobileMenu(!activeMobileMenu)}
                    >
                      <i className="fa-sharp fa-regular fa-bars"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
