import "./NavBar.css";
import React, { Component, useContext, createRef } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext";

const NavbarThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      className={`nav-theme-toggle ${isDarkMode ? "dark" : "light"}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="nav-toggle-icon">{isDarkMode ? "🌙" : "☀️"}</span>
    </button>
  );
};

class NavBar2 extends Component {
  state = { stuck: false, navHeight: 0 };
  sentinelRef = createRef();
  navRef = createRef();
  observer = null;

  componentDidMount() {
    // Measure real navbar height so placeholder is always exact
    if (this.navRef.current) {
      this.setState({ navHeight: this.navRef.current.offsetHeight });
    }

    // Re-measure on resize so placeholder stays correct on all screen sizes
    this.resizeObserver = new ResizeObserver(() => {
      if (this.navRef.current) {
        this.setState({ navHeight: this.navRef.current.offsetHeight });
      }
    });
    if (this.navRef.current) {
      this.resizeObserver.observe(this.navRef.current);
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.setState({ stuck: !entry.isIntersecting });
      },
      { threshold: 0, rootMargin: "0px" }
    );
    if (this.sentinelRef.current) {
      this.observer.observe(this.sentinelRef.current);
    }
  }

  componentWillUnmount() {
    if (this.observer) this.observer.disconnect();
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }

  render() {
    const { stuck, navHeight } = this.state;
    return (
      <>
        {/* Sentinel: zero-height trigger point */}
        <div ref={this.sentinelRef} className="nav-sentinel" />

        {/* Placeholder: ALWAYS rendered, height flips instantly — no async gap */}
        <div
          className="nav-placeholder"
          style={{ height: stuck ? navHeight : 0 }}
        />

        <nav
          ref={this.navRef}
          className={`navbar-modern ${stuck ? "navbar-stuck" : ""}`}
        >
          <div className="nav-container">
            <ul className="nav-links">
              <li>
                <NavLink className="nav-link" activeClassName="active" to="/about-me">
                  <span className="nav-icon"><i className="fa fa-user" /></span>
                  <span className="nav-text">About Me</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" activeClassName="active" to="/it-services">
                  <span className="nav-icon"><i className="fa fa-cogs" /></span>
                  <span className="nav-text">IT Services</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" activeClassName="active" to="/ui-ux">
                  <span className="nav-icon"><i className="fa fa-desktop" /></span>
                  <span className="nav-text">UI/UX</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" activeClassName="active" to="/prints">
                  <span className="nav-icon"><i className="fa fa-print" /></span>
                  <span className="nav-text">Prints</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" activeClassName="active" to="/logos">
                  <span className="nav-icon"><i className="fa fa-star" /></span>
                  <span className="nav-text">Logos</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" activeClassName="active" to="/artworks">
                  <span className="nav-icon"><i className="fa fa-paint-brush" /></span>
                  <span className="nav-text">Artworks</span>
                </NavLink>
              </li>
            </ul>
            <NavbarThemeToggle />
          </div>
        </nav>
      </>
    );
  }
}

export default NavBar2;