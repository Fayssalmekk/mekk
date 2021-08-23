import "./Banner.css";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import mainLogo from "../../Assets/mainLogo.png";
import head1 from "../../Assets/head1.png";
import content from '../../Contents/HomeContent'




class Banner extends Component {
    constructor(props) {
        super(props);
        this.Language = this.props.language
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <div>
                <div className="banner">
                    <div className="container ">
                        <div className="text-center logo ">
                            <img className="img-fluid" src={mainLogo} />
                            <h1 className="txt1">Welcome To My Portfolio</h1>

                            <div className="row dakchi text-center ">
                                <div className="txt2 " id="typing">I AM <span>FAYSSAL EL MEKKAOUI.</span></div>
                                <div className="txt2 " id="crow">|</div>
                            </div>





                        </div>


                    </div>
                    <div>
                        <ul className="text-center ic">
                            <li className="faa fa fa-github fa-2x"></li>
                            <li className="faa fa fa-facebook fa-2x"></li>
                            <li className="faa fa fa-instagram fa-2x"></li>
                            <li className="faa fa fa-linkedin fa-2x"></li>
                        </ul>

                    </div>
                </div>


            </div>
        );
    }
}

export default Banner;