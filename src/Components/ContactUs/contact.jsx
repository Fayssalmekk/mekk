import React, { Component } from "react";
import "./ContactUs.css"
import axios from "axios";





class Contact extends Component {
    constructor(props) {
        super(props);
        this.Language = this.props.language;
        this.state={
            err:"",
            name:"",
            email:"",
            phoneNumber:"",
            message:""
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
        e.preventDefault()

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

    render() {
        return (
            <div className="container">
                <div className="row card1">
                    <div className="col-lg-4 col-md-5">
                        <div className="contact-info">
                            <h3>Pour toutes demandes et assistance</h3>
                            <div className="contact-info-item">
                                <i className="fa fa-location-arrow"></i>
                                <h4>Localisation</h4>
                                <p>23 Rue Hassan, Meknes</p>
                            </div>
                            <div className="contact-info-item">
                                <i className="fa fa-envelope"></i>
                                <h4>Écrivez-nous à</h4>
                                <p>zkhattabi@Solairius.com</p>
                            </div>
                            <div className="contact-info-item">
                                <i className="fa fa-phone"></i>
                                <h4>Appelez-nous au</h4>
                                <p>+212 - 600 777 177</p>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7">
                        <div className="contact-form">
                            <form id="form" method="POST" onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="text" name="name" placeholder="Nom Complet" className="form-control" onChange={this.changeName}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <input type="email" name="email" placeholder="E-mail" className="form-control" onChange={this.changeEmail}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input type="text" name="phone" placeholder="Téléphone" className="form-control" onChange={this.changePhoneNumber}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <textarea placeholder="Message" name="message" className="form-control"onChange={this.changeMessage}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <button type="submit" className="btn btn-2">Send Message</button>
                                    </div>
                                </div>
                            </form>
                            <p>{this.state.err}</p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Contact;