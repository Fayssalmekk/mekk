import React from 'react';
import Logo2 from '../../Assets/Logo2.png'


import "./Cv.css"

class Cv extends React.Component {

    render() {
        return (
            <div className="cv body ">





                <body className="mt-3 bg-light">
                    <div className="container card bg-white border-0 mb-5 shadow-sm">
                        <div className=" card-body d-flex align-items-center justify-content-start p-5 flex-sm-column flex-column flex-md-row">
                            <img src="https://media-exp1.licdn.com/dms/image/C4D03AQGEJHHZLNITQQ/profile-displayphoto-shrink_800_800/0/1595289959603?e=1635379200&v=beta&t=20bmbfivQZxci1SG9PyCit6OL-m2sESlR8uyLCT6y8U" className="rounded-circle bg-secondary mb-sm-4 mb-4 mb-md-0" alt="profil" width="200" />
                            <div className="
            d-flex
            flex-column
            align-items-center
            align-items-sm-center
            align-items-md-start
            justify-content
            between
            ms-0
            ms-md-4
            mb-sm-5
            mb-5
            mb-md-0
          ">
                                <h1 className="name  ml-md-5 mb-0">Fayssal El MEKKAOUI</h1>
                                <p className="job ml-md-5 mb-md-4 mt-1">Cloud & IoT engineering Studnt | Graphic designer</p>
                                <div className="d-flex align-items-center justify-content-between">
                                    <button onClick={() => window.open("https://www.github.com/Fayssalmekk")} className="btn btn-dark rounded-circle ml-md-5 fs-4 p-0" style={{ height: "40px", width: "40px" }}>
                                        <i className=" fa fa-github"></i>
                                    </button>
                                    <button onClick={() => window.open("https://www.linkedin.com/in/fayssal-el-mekkaoui-33bb90198/")} className="btn btn-primary rounded-circle ms-2 ml-2 fs-4 p-0" style={{ height: "40px", width: "40px" }}>
                                        <i className=" fa fa-linkedin"></i>
                                    </button>
                                    <button onClick={() => window.open("https://www.instagram.com/art.mekk/")} className="btn btn-danger rounded-circle ms-2 fs-4 ml-2 p-0" style={{ height: "40px", width: "40px" }}>
                                        <i className=" fa fa-instagram"></i>
                                    </button>
                                    <button onClick={() => window.open("https://www.facebook.com/fayssal.elmekkaoui")} className="btn btn-info text-white rounded-circle ml-2 ms-2 fs-4 p-0" style={{ height: "40px", width: "40px" }}>
                                        <i className=" fa fa-facebook "></i>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-fill d-flex  justify-content-md-end">
                                <img src={Logo2} alt="Logo" className="" />

                            </div>

                        </div>
                    </div>

                    <div className="container h-100">
                        <div className="row pb-5">
                            <div className="col-12 col-lg-8 overflow-auto">
                                <div className="card rounded border-0 mb-3 shadow-sm p-3">
                                    <div className="card-body">
                                        <h2 className="card-title fs-1 mb-5 fw-bold"><i className="fa fa-user"> </i> About Me</h2>
                                        <p className="card-text">
                                            I am Fayssal El MEkkaoui, im 22 years old engineering students at
                                            National Institut of Posts and Telecommunication Rabat, Morocco,
                                            I am also pasionate with graphic design, you find here some of my works
                                            and projects :) enjoy.

                                        </p>
                                    </div>
                                    <hr className="my-1" />
                                </div>


                                <div className="card border-0 rounded shadow-sm mb-3 p-3">
                                    <div className="card-body">
                                        <h2 className="card-title mb-5 fs-1 fw-bold"><i className="fa fa-rocket"> </i> Projects</h2>
                                        <div>
                                            <p>
                                                <span className="fw-bold  fs-5"></span><span className="txthead">&bull; ROAD SIGNS DETECTION :  </span>
                                            </p>
                                            <p>
                                                Detection of road signs and return their values using Opencv and Python.

                                            </p>
                                        </div>
                                        <div className="mt-3">
                                            <p>
                                                <span className="txthead">&bull; DATA-MINING and MACHINE LEARNING : </span>
                                            </p>
                                            <p>
                                                Analysing ahotel boking dataset and predict booking cancelations.
                                            </p>
                                        </div>
                                        <div className="mt-3">
                                            <p>
                                                <span className="fw-bold  fs-5"></span><span className="txthead">&bull; STORAGE WEB APPLICATION :  </span>
                                            </p>
                                            <p>
                                                Building a website where you can uplaod and download files using Reactjs and firebase.

                                            </p>
                                        </div>
                                        <div className="mt-3">
                                            <p>
                                                <span className="txthead">&bull; NETWORK SECURITY :  </span>
                                            </p>
                                            <p>
                                                Securing different equipments of a networkinfrastructure using Cisco packet tracer.
                                            </p>
                                        </div>
                                    </div>
                                    <hr className="my-1" />


                                </div>

                                <div className="card border-0 rounded shadow-sm p-3 mb-3">
                                    <div className="card-body">
                                        <h2 className="card-title fs-1 mb-5 fw-bold"><i className="fa fa-suitcase "> </i> Experience</h2>
                                        <div>
                                            <p>
                                                <span className="fw-bold  fs-5"></span><span className="txthead">&bull; Freelancer at <a href="https://www.inetech.ml">inetech.ml</a><span className="text-muted"> (2020 - current)</span>  </span>
                                            </p>
                                            <p>
                                                Working with a team of developers and graphic designers to satisfy our clients needs in Digiital services ( Websites, UI/UX, WebApps ...)
                                            </p>
                                        </div>
                                        <div className="mt-3">
                                            <p>
                                                <span className="txthead">&bull; Internship <a href="https://www.Esport-Academy.ma">Esport-Academy.ma</a><span className="text-muted"> (July - Septembre 2021) </span></span>
                                            </p>
                                            <p>
                                                Working with a team to build a streaming plateform for videogames + Prototyping
                                            </p>
                                        </div>
                                    </div>

                                    <hr className="my-1" />
                                </div>
                            </div>
                            <div className="col-0 col-lg-4 overflow-auto">
                                <div className="card border-0 rounded shadow-sm mb-3 p-3">
                                    <div className="card-body">
                                        <div className="
                  d-flex
                  flex-column
                  align-items-start
                  justify-content-between
                ">
                                            <div className="d-flex align-items-center justify-content-center mb-2">
                                                <i className="  faa fa fa-map-marker"> </i>
                                                <span className="ms-2 ml-3"> Safi, Morocco</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center mb-2">
                                                <i className="faa fa fa-envelope"></i>
                                                <a href="mailto:fayssalelmekkaouui@gmail.com" className="ms-2 ml-2 text-decoration-none text-dark">fayssalelmekkaoui@gmail.com</a>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center mb-2">
                                                <i className="faa fa fa-phone"></i>
                                                <a href="https://www.google.com" className="ms-2 ml-2 text-decoration-none text-dark">+212 6 37 21 20 54</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-0 rounded shadow-sm mb-3 pl-3 pr-3 pt-3 ">
                                    <div className="card-body">
                                        <h2 className="card-title fs-3 fw-bold mb-4"><i className="fa fa-magic"> </i> skills</h2>
                                        <div className="mb-5">
                                            <div>
                                                <div className="border-start border-5 border-primary ps-4">
                                                    <p>
                                                        <p> Adobe Photoshop</p>
                                                        <p>Adobe Xd</p>
                                                        <p>Html, css , Reactjs</p>
                                                        <p>Bootstrap</p>
                                                        <p>Python, java, c </p>
                                                        <p>MySql, mongoDb</p>
                                                        <p>Data mining</p>

                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-0 rounded shadow-sm mb-3 p-3">
                                    <div className="card-body">
                                        <h2 className="card-title fs-3 fw-bold mb-4"><i className="fa fa-graduation-cap"> </i> Education</h2>
                                        <div className="d-flex align-items-center justify-content-start mb-3">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <i className="m-0 p-0 bi bi-building"></i>
                                            </div>
                                            <div className="
                    d-flex
                    flex-column
                    align-items-start
                    justify-content-center
                    ms-3
                  ">
                                                <p className="card-text">&bull; INPT - RABAT (2019 - Current) </p>
                                                <p className="card-text">&bull; PREPARATORY CLASSES (2017 - 2019</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-0 rounded shadow-sm p-3">
                                    <div className="card-body">
                                        <h2 className="card-title fs-3 fw-bold mb-4"><i className="fa fa-language"> </i> Languages</h2>
                                        <div className="
                  d-flex
                  flex-column
                  align-items-start
                  justify-content-center
                  mb-3
                ">
                                            <p className=" mb-1">
                                                <span className="card-text">Arabic </span><span className="stars"> ★★★★★</span>
                                            </p>
                                            <p className=" mb-1">
                                                <span className="card-text">English </span><span className="stars"> ★★★★☆</span>
                                            </p>
                                            <p className=" mb-1">
                                                <span className="card-text">French </span><span className="stars"> ★★★★☆</span>
                                            </p>
                                            <div className="
                    d-flex
                    align-items-center
                    justify-content-center
                    text-warning
                  ">
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill ms-1"></i>
                                                <i className="bi bi-star-fill ms-1"></i>
                                                <i className="bi bi-star-fill ms-1"></i>
                                                <i className="bi bi-star-fill ms-1"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => { window.location.href = "https://drive.google.com/file/d/1SQgHBvqKwanksDJdNs-yGxTXh6_qIiPq/view?usp=sharing" }} className="text-center button" href="www.google.com" > <i className="fa fa-download">  </i>  Download My CV </button>
                                </div>
                            </div>

                        </div>
                    </div>


                </body>


            </div >
        )

    }

}
export default Cv;
