import "./Banner.css";
import React, { Component, useState, useEffect, useContext } from "react";
import mainLogo from "../../Assets/mainLogo.png";
import Logo2 from "../../Assets/Logo2.png";
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext';

// Typing animation component with realistic effect
const TypingAnimation = () => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  useEffect(() => {
    const textArray = [
      "FAYSSAL EL MEKKAOUI.",
      "a DEVOPS/Cloud ENGINEER.",
      "a CLOUD ENTHUSIAST.",
      "a GRAPHIC DESIGNER."
    ];
    
    const currentText = textArray[loopNum % textArray.length];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayText(currentText.substring(0, displayText.length + 1));
        setTypingSpeed(100 + Math.random() * 50); // Random speed for realism
        
        if (displayText === currentText) {
          // Pause at end before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setTypingSpeed(50 + Math.random() * 30);
        
        if (displayText === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="typing-text">{displayText}</span>
  );
};

// Theme Toggle Button Component
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      className={`theme-toggle-btn ${isDarkMode ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          <span className="icon sun">☀️</span>
          <span className="icon moon">🌙</span>
        </div>
      </div>
      <span className="toggle-label">{isDarkMode ? 'Dark' : 'Light'}</span>
    </button>
  );
};

// Theme-aware Logo
const ThemeLogo = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <img 
      className="img-fluid main-logo" 
      alt="profile" 
      src={isDarkMode ? mainLogo : Logo2} 
    />
  );
};

class Banner extends Component {
  render() {
    return (
      <div>
        <div className="banner">
          <div className="banner-gradient"></div>
          <div className="banner-particles"></div>
          <div className="container">
            <div className="text-center logo-container">
              <NavLink to="/about-me">
                <ThemeLogo />
              </NavLink>
              <h1 className="txt1">Welcome To My Portfolio</h1>

              <div className="typing-container">
                <p className="txt2">
                  I AM <TypingAnimation />
                </p>
                <span className="cursor">|</span>
              </div>

              {/* Theme Toggle Button */}
              <div className="theme-toggle-wrapper">
                <ThemeToggle />
              </div>

              <ul className="social-icons">
                <li onClick={() => window.open("https://www.github.com/Fayssalmekk")} className="social-icon github">
                  <i className="fa fa-github"></i>
                </li>
                <li onClick={() => window.open("https://www.facebook.com/fayssal.elmekkaoui")} className="social-icon facebook">
                  <i className="fa fa-facebook"></i>
                </li>
                <li onClick={() => window.open("https://www.instagram.com/art.mekk/")} className="social-icon instagram">
                  <i className="fa fa-instagram"></i>
                </li>
                <li onClick={() => window.open("https://www.linkedin.com/in/fayssal-el-mekkaoui-33bb90198/")} className="social-icon linkedin">
                  <i className="fa fa-linkedin"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;