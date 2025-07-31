"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Logout from "../Logout/Logout";

export default function ProfileMenu() {
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
      <div className="">
        <div ref={menuRef} className="relative inline-block text-left"></div>
        <div className="profile-dropdown-menu-area " ref={menuRef}>
          <div className="profile" onClick={toggleDropdown}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA-m4D7gaOaHMGxxheIp_xF_OSzrba6G7MIA&s" />
            <h5 className="desktop-header">
              Iqbal Hossen
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
                <br />
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
    </>
  );
}
