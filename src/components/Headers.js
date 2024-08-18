import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import logo from './img/logo.jpg';
import menu from './img/menu.png';

import transferImage from '../components/img/transfer.png';
import contactImage from '../components/img/contact.png';
import aboutusImage from '../components/img/aboutus.png';
import defenseImage from '../components/img/defens.png';
import LogIn from '../components/img/LogIn.svg';
import History from '../components/img/History.svg';
import LogOut from '../components/img/LogOut.svg';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const menuRef = useRef(null);
  const blocksRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, { height: 'auto', duration: 0.5, ease: 'power2.out' });
      gsap.to('.page-content', { y: '200px', duration: 0.5, ease: 'power2.out' });
    } else {
      gsap.to(menuRef.current, { height: 0, duration: 0.5, ease: 'power2.in' });
      gsap.to('.page-content', { y: '0px', duration: 0.5, ease: 'power2.in' });
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const NavigateHome = () => {
    window.location.href = '/startp';
  };

  const NavigateLogin = () => {
    window.location.href = '/login';
  };

  const NavigateRegister = () => {
    window.location.href = '/register';
  };

  const NavigateHistory = () => {
    window.location.href = '/history';
  };

  const handleMouseEnter = (index) => {
    gsap.to(blocksRef.current[index], {
      scale: 1.1,
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
      duration: 0.3,
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(blocksRef.current[index], {
      scale: 1,
      boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
      duration: 0.3,
    });
  };

  const handleBlockClick = (path, index) => {
    setActiveIndex(index);
    setMenuOpen(false); // Close the menu
    navigate(path);
  };

  return (
    <nav className="relative bg-white shadow-md py-4 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <img src={logo} alt="Company Logo" className="h-25 w-25 mr-2" />
        </div>

        <div className="flex items-center ">
          <button className="text-gray-600 hover:text-gray-900 px-3 py-2 md:hidden" onClick={toggleMenu}>
            <img src={menu} alt="menu" className="h-8 w-8 mr-2" />
          </button>
          <div className="hidden md:flex items-center ">
            {isAuthenticated ? (
              <>
                <div className="flex items-center font-sans text-16px justify-center bg-gray-100 rounded-lg p-4  hover:bg-purple-950 hover:text-white transition w-[150px] h-[50px] mr-[25px]">
                  <button className="flex items-center" onClick={NavigateHistory}>
                    <img src={History} alt="history" className='w-25 h-25 mr-[15.65px]'></img>
                    История
                  </button>
                </div>

                <div className="flex items-center  fonts-sans justify-center bg-gray-100 rounded-lg p-4 hover:bg-purple-950 hover:text-white transition w-[150px] h-[50px] mr-[25px]">
                  <button className="flex items-center" onClick={handleLogout}>
                    <img src={LogOut} alt='LogOut' className='h-25 w-25 mr-[15.65px]'></img>
                    Выйти
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center font-sans text-16px justify-center bg-gray-100 rounded-lg p-4  hover:bg-purple-950 hover:text-white transition w-[150px] h-[50px] mr-[25px]">
                  <button className="flex items-center" onClick={NavigateHistory}>
                    <img src={History} alt="history" className='w-25 h-25 mr-[15.65px]'></img>
                    История
                  </button>
                </div>

                <div className="flex items-center  fonts-sans justify-center bg-gray-100 rounded-lg p-4 hover:bg-purple-950 hover:text-white transition w-[150px] h-[50px] mr-[25px]">
                  <button className="flex items-center" onClick={NavigateLogin}>
                    <img src={LogIn} alt="LogIn" className='h-25 w-25 mr-[15.65px]'></img>
                    Войти
                  </button>
                </div>


              </>
            )}
            <button className="flex items-center justify-center bg-gray-100 hover:bg-purple-950  rounded-lg transition w-[54px]  h-[50px] p-4 " onClick={toggleMenu}>
              <img src={menu} alt="menu" className="h-22 w-32 " />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        className="absolute left-0 top-full w-full bg-white shadow-md overflow-hidden z-50"
        style={{ height: 0 }}
      >
        <div className="flex flex-col md:flex-row justify-center items-center mb-4 mt-4 gap-4">
          {[{
            img: transferImage,
            alt: "Translation",
            text: "Переводы",
            path: "/transfer",
          }, {
            img: aboutusImage,
            alt: "About Us",
            text: "О нас",
            path: "/abouts",
          }, {
            img: defenseImage,
            alt: "Protection",
            text: "Защита данных",
            path: "/securityinfo",
          }, {
            img: contactImage,
            alt: "Contacts",
            text: "Контакты",
            path: "/contacts",
          }].map((block, index) => (
            <div
              key={index}
              ref={(el) => blocksRef.current[index] = el}
              className={`flex rounded-[25px] flex-col items-center justify-start p-2 mx-8 w-[66%] md:w-[190px] h-[196px] cursor-pointer transition-transform duration-300 mb-4 ${activeIndex === index ? 'bg-grayth' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => handleBlockClick(block.path, index)}
            >
              <span className="mt-4 mb-10 font-bold">{block.text}</span>
              <img src={block.img} alt={block.alt} className="h-20 w-20" />
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
