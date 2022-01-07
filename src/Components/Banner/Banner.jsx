import "./Banner.css";
import React, { Component } from "react";

import mainLogo from "../../Assets/mainLogo.png";
import { NavLink } from 'react-router-dom';




class Banner extends Component {
    
    render() {
        return (
            <div>
                <div id="anim" className="banner ">
                    <div   className="container">
                        <div className="text-center logo ">
                            <NavLink to="/about-me"><img className="img-fluid logo"  alt="profil" src={mainLogo} /></NavLink>
                            <h1 className="txt1">Welcome To My Portfolio</h1>

                            <div className="row dakchi  ">
                                <p className="txt2 " id="typing">I AM <span>FAYSSAL EL MEKKAOUI.</span></p>
                                <div className="txt2 " id="crow">|</div>
                            </div>





                        </div>


                    </div>
                    <div>
                        <ul  id="anim" className="text-center ic anim">
                            <li onClick={()=> window.open("https://www.github.com/Fayssalmekk")} className="ichover faa fa fa-github fa-2x"></li>
                            <li onClick={()=> window.open("https://www.facebook.com/fayssal.elmekkaoui")} className="ichover faa fa fa-facebook fa-2x"></li>
                            <li onClick={()=> window.open("https://www.instagram.com/art.mekk/")} className="ichover faa fa fa-instagram fa-2x"></li>
                            <li onClick={()=> window.open("https://www.linkedin.com/in/fayssal-el-mekkaoui-33bb90198/")} className="ichover faa fa fa-linkedin fa-2x"></li>
                        </ul>

                    </div>
                </div>


            </div>
        );
    }
}

export default Banner;