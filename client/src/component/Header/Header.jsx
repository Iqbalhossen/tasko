"use client";
import { BookCheck, ChevronDown, Clock12, LoaderPinwheel } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";
import Logout from "../Logout/Logout";

export default function Header({ params }) {
    const { userInfo, token } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <div className="task-header">
        <div className="row">
          <div className="col-6">
            <div className="d-flex aligin-items-center justify-content-between">
              <div className="logo">
                <Link href="/dashboard">
                  <Clock12 size={30} /> Tasko
                </Link>
              </div>
              <div className="mobile-menu">
                <MobileMenu />
                <ProfileMenu />
              </div>

              <div className="d-flex aligin-items-center justify-content-between desktop-header">
                <Link href="" className="active">
                  <BookCheck size={30} /> Task Lists
                </Link>
                <Link href="">
                  <LoaderPinwheel size={30} /> Spin
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6 text-end desktop-header">
            <div
              ref={menuRef}
              className=" inline-block text-left"
            ></div>
            <div className="profile-dropdown-menu-area " ref={menuRef}>
              <div className="profile" onClick={toggleDropdown}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA-m4D7gaOaHMGxxheIp_xF_OSzrba6G7MIA&s" />
                <h5 className="desktop-header">
                  {userInfo?.name}
                  <ChevronDown
                    className={`ms-2 profile-menu-chevron ${
                      isOpen ? "profile-menu-chevron-rotate" : ""
                    }`}
                  />
                </h5>
              </div>

              {isOpen && (
                <div className={`menu active`}>
                  <h3>
                   {userInfo?.name}
                  </h3>
                  <ul>
                    <li>
                      <Link href="/afag">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA-m4D7gaOaHMGxxheIp_xF_OSzrba6G7MIA&s" />
                        My profile
                      </Link>
                    </li>

                    <Logout />
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
