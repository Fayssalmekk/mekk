import "./AboutUs.css";
import React, { Component } from "react";
import axios from "axios";
import content from '../../Contents/AboutUsContent'
import content2 from '../../Contents/NavBarContent'






class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.Language = this.props.language
        this.state={
            name:"",
            email:"",
            phoneNumber:"",
            message:"",
            err:""
        }
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePhoneNumber = this.changePhoneNumber.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeName(e){
        this.setState({
            name: e.target.value
        })
    }
    changeEmail(e){
        this.setState({
            email: e.target.value
        })
    }
    changePhoneNumber(e){
        this.setState({
            phoneNumber: e.target.value
        })
    }
    changeMessage(e){
        this.setState({
            message: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

       var message={
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            message: this.state.message,
        }
        axios.post('http://localhost:8080/api/message', message)
            .then(res =>
                this.setState({
                    err: res.data
                })
                
            )

    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (

            <div id="aboutUs">
                <h3 className="title text-center" >{content2.aboutUs[this.Language]}</h3>
                <div className="about-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-6 col-sm-12 col-12 ptext ml-3 pr-4">
                            
                                <h1 className="aboutustitle">{content.aboutustitle[this.Language]}</h1>
                                <p className="aboutusp">{content.aboutuscontent1[this.Language]} </p>
                                <p className="aboutusp p2">{content.aboutuscontent2[this.Language]} </p>
                                <p className="aboutusp p2">{content.aboutuscontent3[this.Language]} </p>
                                <div className="icons ">
                                    <i className="fa fa-facebook fa-lg"></i>
                                    <i className="fa fa-linkedin fa-lg"></i>
                                    <i className="fa fa-twitter fa-lg"></i>
                                    <i className="fa fa-instagram fa-lg"></i>
                                </div>
                            </div>
                            <div className="circle d-none d-xl-block"></div>
                            <div className="circle2 d-none d-xl-block"></div>
                            <div className="col-md-1 col-1 col-sm-1 "></div>
                            <div className="col-md- col-lg- col-sm- col- d-flex justify-items-around">
                                <div className="form-box " id="feedback-form">

                                    <h2 className="header">Contact us</h2>
                                    <div>
                                        <form method="POST" onSubmit={this.onSubmit}>
                                            <input type="text" name="name" placeholder="Name" onChange={this.changeName}></input>
                                            <input type="email" name="email" placeholder="Email"onChange={this.changeEmail}></input>
                                            <input type="text" name="phoneNumber" placeholder="Télé"onChange={this.changePhoneNumber}></input>
                                            <div> Your Message</div>
                                            <textarea type="text" name="Question" placeholder="" className="textera" onChange={this.changeMessage}></textarea>
                                            <button type="submit">Send</button>
                                        </form>
                                        <p>{this.state.err}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutUs;