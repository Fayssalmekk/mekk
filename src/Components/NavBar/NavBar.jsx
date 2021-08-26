import "./NavBar.css";
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';





class NavBar2 extends Component {

  listener = null;
  state = {
    nav: false
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 700) {
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
      <nav className={`naav ${this.state.nav && 'Nav__black'}`}  >


        <div className="text-center txt3" id="">
          <ul className="txt3">


            <NavLink className="link" activeClassName="active_link" to="/aboutme"><i className="ico  pl-2 fa fa-address-card"></i> <span className="block"> About me</span></NavLink>
            <NavLink className="link" activeClassName="active_link" to="/uiux"><i className="ico pl-2 fa fa-desktop"></i> <span className="block">UI/UX</span></NavLink>
            <NavLink className="link" activeClassName="active_link" to="/flyers"> <i className="ico pl-2 fa fa-map-o"></i> <span className="block">Flyers</span></NavLink>
            <NavLink className="link" activeClassName="active_link" to="/artworks"> <i className="ico pl-2 fa fa-flag"></i> <span className="block">Logos</span></NavLink>
            <NavLink className="link" activeClassName="active_link" to="/manip"> <i className="ico pl-2 fa fa-paint-brush"> </i><span className="block">Artoworks</span></NavLink>


          </ul>
        </div>
      </nav >
    );
  }
}

export default NavBar2;