import "./NavBar.css";
import React, { Component, useState, useEffect, useContext } from "react";
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContext';

// Theme toggle for navbar (smaller version)
const NavbarThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      className={`nav-theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="nav-toggle-icon">
        {isDarkMode ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

class NavBar2 extends Component {
  listener = null;
  state = {
    nav: false,
    scrolled: false
  }
  
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const scrollY = window.scrollY;
    const isScrolled = scrollY > 50;
    
    if (isScrolled !== this.state.scrolled) {
      this.setState({ scrolled: isScrolled });
    }
    
    if (scrollY > 300) {
      if (!this.state.nav) {
        this.setState({ nav: true });
      }
    } else {
      if (this.state.nav) {
        this.setState({ nav: false });
      }
    }
  }

  render() {
    return (
      <nav className={`navbar-modern ${this.state.scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <ul className="nav-links">
            <li>
              <NavLink className="nav-link" activeClassName="active" to="/about-me">
                <span className="nav-icon"><i className="fa fa-user"></i></span>
                <span className="nav-text">About Me</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" activeClassName="active" to="/it-services">
                <span className="nav-icon"><i className="fa fa-cogs"></i></span>
                <span className="nav-text">IT Services</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" activeClassName="active" to="/ui-ux">
                <span className="nav-icon"><i className="fa fa-desktop"></i></span>
                <span className="nav-text">UI/UX</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" activeClassName="active" to="/prints">
                <span className="nav-icon"><i className="fa fa-print"></i></span>
                <span className="nav-text">Prints</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" activeClassName="active" to="/logos">
                <span className="nav-icon"><i className="fa fa-star"></i></span>
                <span className="nav-text">Logos</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" activeClassName="active" to="/artworks">
                <span className="nav-icon"><i className="fa fa-paint-brush"></i></span>
                <span className="nav-text">Artworks</span>
              </NavLink>
            </li>
          </ul>
          <NavbarThemeToggle />
        </div>
      </nav>
    );
  }
}

export default NavBar2;