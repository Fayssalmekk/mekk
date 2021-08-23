import "./Footer.css"
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import logowhite from '../../Assets/logowhite.png';
import content from '../../Contents/NavBarContent'




class Footer extends Component {
    constructor(props) {
        super(props);
        this.Language = this.props.language
    }

    render() {
        return (
            <footer>
                <div className="footer">
                    <div className="container footer-res">
                        <Link className="footer-brand" to="/">
                             <img className="img-fluid logofooter" src={logowhite} alt="Solairus" />
                        </Link>
                        
                        <div className="footer-right">
                            
                            <ul className="navbar-nav ml-auto">
                                
                                <li className="nav-item active">
                                    <Link className="nav-link mb-0 h1" to="/faq">{content.faq[this.Language]}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mb-0 h1" to="/career">{content.career[this.Language]}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mb-0 h1" to="/aboutus">{content.aboutUs[this.Language]}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mb-0 h1" to="/contactus">{content.contactus[this.Language]}</Link>
                                </li>
                                <li className="icon  ">
                                    <i className="fa fa-facebook fa-lg"></i>
                                    <i className="fa fa-linkedin fa-lg"></i>
                                    <i className="fa fa-twitter fa-lg"></i>
                                    <i className="fa fa-instagram fa-lg"></i>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                </div>    
                <div className="lastline"></div>
            </footer>
        );
    }
}

export default Footer;