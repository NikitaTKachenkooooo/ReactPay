import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import logo from "./img/logo.jpg";
import menu from "./img/menu.png";
import menuHov from "./img/menuHov.png";
import transferImage from "../components/img/transfer.png";
import contactImage from "../components/img/contact.png";
import aboutusImage from "../components/img/aboutus.png";
import defenseImage from "../components/img/defens.png";
import LogIn from "../components/img/LogIn.svg";
import LoginHovEnter from "../components/img/LoginHovEnter.svg";
import LoginHovLeav from "../components/img/LoginHovLeav.svg";
import History from "../components/img/History.svg";
import historyHov from "../components/img/historyHov.svg";
import LogOut from "../components/img/LogOut.svg";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isHistoryHovered, setIsHistoryHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const menuRef = useRef(null);
  const blocksRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, {
        height: "auto",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(".page-content", {
        y: "200px",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(menuRef.current, { height: 0, duration: 0.5, ease: "power2.in" });
      gsap.to(".page-content", { y: "0px", duration: 0.5, ease: "power2.in" });
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  const NavigateHome = () => {
    window.location.href = "/startp";
  };

  const NavigateLogin = () => {
    window.location.href = "/login";
  };

  const NavigateRegister = () => {
    window.location.href = "/register";
  };

  const NavigateHistory = () => {
    window.location.href = "/history";
  };

  const handleMouseEnterMenu = () => {
    setIsMenuHovered(true);
  };

  const handleMouseLeaveMenu = () => {
    setIsMenuHovered(false);
  };

  const handleMouseEnterHistory = () => {
    setIsHistoryHovered(true);
  };

  const handleMouseLeaveHistory = () => {
    setIsHistoryHovered(false);
  };

  const handleMouseEnterLogin = () => {
    setIsLoginHovered(true);
  };

  const handleMouseLeaveLogin = () => {
    setIsLoginHovered(false);
  };

  const handleBlockClick = (path, index) => {
    setActiveIndex(index);
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="relative bg-white shadow-md py-4 z-50 flex justify-center">
      <div className="container mx-auto flex justify-between items-center px-4 w-70 min-w-1280 mx-108-5">
        <div className="flex items-center">
          <img src={logo} alt="Company Logo" className="h-25 w-25 mr-2" />
        </div>

        <div className="flex items-center">
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <>
                <div
                  className="flex items-center font-sans text-16px justify-center bg-gray-100 rounded-lg p-4 hover:bg-purple-950 hover:text-white transition w-[150px] h-[50px] mr-[25px]"
                  onMouseEnter={handleMouseEnterHistory}
                  onMouseLeave={handleMouseLeaveHistory}
                >
                  <button
                    className="flex items-center w-full h-full"
                    onClick={NavigateHistory}
                  >
                    <img
                      src={isHistoryHovered ? historyHov : History}
                      alt="history"
                      className="h-5 w-5"
                    />
                    <span className="ml-2">История</span>
                  </button>
                </div>

                <div
                  className="flex items-center font-sans justify-center bg-gray-100 rounded-lg p-4 hover:bg-purple-950 hover:text-white transition w-[150px] h-[50px] mr-[25px]"
                  onMouseEnter={handleMouseEnterLogin}
                  onMouseLeave={handleMouseLeaveLogin}
                >
                  <button
                    className="flex items-center w-full h-full"
                    onClick={handleLogout}
                  >
                    <img
                      src={isLoginHovered ? LoginHovLeav : LogOut}
                      alt="LogOut"
                      className="h-5 w-5"
                    />
                    <span className="ml-2">Выйти</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  className="flex items-center font-sans text-16px justify-center bg-gray-100 rounded-lg p-4 hover:bg-purple-950 hover:text-white transition w-[150px] h-[50px] mr-[25px]"
                  onMouseEnter={handleMouseEnterHistory}
                  onMouseLeave={handleMouseLeaveHistory}
                >
                  <button
                    className="flex items-center w-full h-full"
                    onClick={NavigateHistory}
                  >
                    <img
                      src={isHistoryHovered ? historyHov : History}
                      alt="history"
                      className="h-5 w-5"
                    />
                    <span className="ml-2">История</span>
                  </button>
                </div>

                <div
                  className="flex items-center font-sans justify-center bg-gray-100 rounded-lg p-4 hover:bg-purple-950 hover:text-white transition w-[150px] h-[50px] mr-[25px]"
                  onMouseEnter={handleMouseEnterLogin}
                  onMouseLeave={handleMouseLeaveLogin}
                  onClick={NavigateLogin}
                >
                  <button className="flex items-center w-full h-full">
                    <img
                      src={isLoginHovered ? LoginHovEnter : LogIn}
                      alt="LogIn"
                      className="h-5 w-5"
                    />
                    <span className="ml-2">Войти</span>
                  </button>
                </div>
              </>
            )}
            <button
              className="flex items-center justify-center bg-gray-100 hover:bg-purple-950 rounded-lg transition w-[54px] h-[50px] p-4"
              onMouseEnter={handleMouseEnterMenu}
              onMouseLeave={handleMouseLeaveMenu}
              onClick={toggleMenu}
            >
              <img
                src={isMenuHovered ? menuHov : menu}
                alt="menu"
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        className="absolute left-0 top-full w-full bg-white shadow-md overflow-hidden z-50"
        style={{ height: 0 }}
      >
        <div className="flex justify-center items-center">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-4 w-70 min-w-1280 gap-103 px-4">
            {[
              {
                img: transferImage,
                alt: "Translation",
                text: "Переводы",
                path: "/transfer",
              },
              {
                img: aboutusImage,
                alt: "About Us",
                text: "О нас",
                path: "/abouts",
              },
              {
                img: defenseImage,
                alt: "Protection",
                text: "Защита данных",
                path: "/securityinfo",
              },
              {
                img: contactImage,
                alt: "Contacts",
                text: "Контакты",
                path: "/contacts",
              },
            ].map((block, index) => (
              <div
                key={index}
                ref={(el) => (blocksRef.current[index] = el)}
                className={`flex rounded-lg flex-col items-center justify-center p-4 w-full md:w-[190px] h-[50px] cursor-pointer transition-transform duration-300 hover:bg-purple-950 hover:text-white bg-gray-100 ${
                  activeIndex === index ? "bg-gray-200" : "bg-gray-100"
                }`}
                onClick={() => handleBlockClick(block.path, index)}
              >
                <div className="flex items-center">
                  <img src={block.img} alt={block.alt} className="h-5 w-5" />
                  <span className="ml-2 font-sans text-16px">{block.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
