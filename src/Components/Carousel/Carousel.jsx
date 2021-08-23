import "./Carousel.css";
import React, { Component } from "react";
import image1 from "../../Assets/image1.jpg";
import image2 from '../../Assets/image2.jpg';
import image5 from '../../Assets/image5.jpg';
import image4 from '../../Assets/image4.jpg';
import content from '../../Contents/HomeContent';






class Carousel extends Component {
    constructor(props) {
        super(props);
        this.Language = this.props.language
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (

            <div className="footer-section">
            <div className="container">
                
                
                <h1 className="title text-center" >{content.projects[this.Language]}</h1>
                
                <div>
                    <h1 className="title-carousel">Projet projet dans dans ville</h1>
                    <p className="p-carousel" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci esse vitae exercitationem fugit, numquam minus!</p>
                </div>
                <div className="carousel slide d-flex justify-content-center" id="main-carousel" data-ride="carousel">
                    
                    <ol className="carousel-indicators">
                        <li data-target="#main-carousel" data-slide-to="0" class="active"></li>
                        <li data-target="#main-carousel" data-slide-to="1"></li>
                        <li data-target="#main-carousel" data-slide-to="2"></li>
                        <li data-target="#main-carousel" data-slide-to="3"></li>
                    </ol>
                    <div className="carousel-inner">

                        <div className="carousel-item active">
                            <img className="d-block img-fluid " alt="" src={image1}></img>

                        </div>
                        <div className="carousel-item">
                            <img className="d-block img-fluid" src={image2} alt=""></img>

                        </div>
                        <div className="carousel-item">
                            <img className="d-block img-fluid" src={image5} alt=""></img>

                        </div>
                        <div className="carousel-item">
                            <img className="d-block img-fluid" src={image4} alt=""></img>

                        </div>

                    </div>

                    <a href="#main-carousel" className="carousel-control-prev" data-slide="prev">
                        <span className="carousel-control-prev-icon "></span>
                        <span className="sr-only" aria-hidden="true">Prev</span>
                    </a>
                    <a href="#main-carousel" className="carousel-control-next" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                        <span className="sr-only" aria-hidden="true">Next</span>
                    </a>
                </div>
            </div>
            </div>


        );
    }
}

export default Carousel;