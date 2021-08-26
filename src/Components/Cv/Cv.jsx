import React from 'react';
import Logo2 from '../../Assets/Logo2.png'

import "./Cv.css"

class Cv extends React.Component {
    
    render() {
        return (
            <div className="cv">





                <body className="mt-3 bg-light">
                    <div className="container card bg-white border-0 mb-5 shadow-sm">
                        <div className=" card-body d-flex align-items-center justify-content-start p-5 flex-sm-column flex-column flex-md-row">
                            <img src="https://media-exp1.licdn.com/dms/image/C4D03AQGEJHHZLNITQQ/profile-displayphoto-shrink_800_800/0/1595289959603?e=1635379200&v=beta&t=20bmbfivQZxci1SG9PyCit6OL-m2sESlR8uyLCT6y8U" className="rounded-circle bg-secondary mb-sm-4 mb-4 mb-md-0"  alt="profil" width="200" />
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
                                <div class="d-flex align-items-center justify-content-between">
                                    <button onClick={()=> window.open("https://www.github.com/Fayssalmekk")} className="btn btn-dark rounded-circle ml-md-5 fs-4 p-0" style={{ height: "40px", width: "40px" }}>
                                        <i  className=" fa fa-github"></i>
                                    </button>
                                    <button onClick={()=> window.open("https://www.linkedin.com/in/fayssal-el-mekkaoui-33bb90198/")} className="btn btn-primary rounded-circle ms-2 ml-2 fs-4 p-0" style={{ height: "40px", width: "40px" }}>
                                        <i className=" fa fa-linkedin"></i>
                                    </button>
                                    <button  onClick={()=> window.open("https://www.instagram.com/art.mekk/")} className="btn btn-danger rounded-circle ms-2 fs-4 ml-2 p-0" style={{ height: "40px", width: "40px" }}>
                                        <i className=" fa fa-instagram"></i>
                                    </button>
                                    <button  onClick={()=> window.open("https://www.facebook.com/fayssal.elmekkaoui")} className="btn btn-info text-white rounded-circle ml-2 ms-2 fs-4 p-0" style={{ height: "40px", width: "40px" }}>
                                        <i className=" fa fa-facebook "></i>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-fill d-flex  justify-content-md-end">
                                <img src={Logo2} alt="Logo" className=""/>
                                    
                            </div>

                        </div>
                    </div>

                    <div className="container h-100">
                        <div className="row pb-5">
                            <div className="col-12 col-lg-8 overflow-auto">
                                <div className="card rounded border-0 mb-3 shadow-sm p-3">
                                    <div className="card-body">
                                        <h2 className="card-title fs-1 mb-5 fw-bold">About Me</h2>
                                        <p className="card-text">
                                            I am Fayssal El MEkkaoui, im 22 years old engineering students at
                                            National Institut of Posts and Telecommunication INPT at Rabat, Morocco,
                                            I currently study Ubiquitos and distrubited systems Cloud and IoT,
                                            Im also a passionate wuth graphic design

                                        </p>
                                    </div>
                                </div>

                                <div className="card border-0 rounded shadow-sm mb-3 p-3">
                                    <div className="card-body">
                                        <h2 className="card-title mb-5 fs-1 fw-bold">Projects</h2>
                                        <div>
                                            <div className="row">
                                                <div className="col-md-4 mb-4 mb-md-0 mb-auto">
                                                    <img src="https://raw.githubusercontent.com/neeraj15022001/bootstrap-resume/master/logo.png" alt="logo" class="img-fluid bg-secondary rounded" />
                                                </div>
                                                <div className="col-md-8">
                                                    <p className="fs-2 fw-bolder text-dark">Project 1</p>
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Officia fuga corrupti, eligendi quam odit, laudantium
                                                        dolorum harum distinctio impedit, eaque tenetur! Fugiat
                                                        ipsum cum tenetur amet id pariatur corrupti repellat!
                                                        Illum labore, earum ad consequuntur architecto error
                                                        eveniet cum ipsam repellendus. Fuga aspernatur a illum
                                                        explicabo laborum blanditiis possimus maiores minima saepe
                                                        quos vero quam, commodi quasi repudiandae minus sit?
                                                    </p>
                                                    <a href="https://www.google.com" className="
                        stretched-link
                        text-capitalize text-decoration-none
                      "><i class="bi bi-link-45deg me-1"></i>Find out more</a>
                                                </div>
                                                <hr className="my-4 bg-secondary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 rounded shadow-sm p-3 mb-3">
                                    <div className="card-body">
                                        <h2 className="card-title fs-1 mb-5 fw-bold">Work Experience</h2>
                                        <div>
                                            <p>
                                                <span className="fw-bold text-secondary fs-5">Founder and Lead Developer</span><span class="text-muted">- Project 1</span>
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Asperiores rerum eos similique voluptatibus, reprehenderit ab
                                                dicta explicabo dolores porro id sint! Totam consequatur
                                                sapiente beatae quos necessitatibus excepturi cum qui!
                                                Accusantium aut, vitae, consequuntur nesciunt accusamus nisi
                                                voluptatem illum quos qui laborum consequatur quis, alias
                                                soluta. Quo esse, excepturi in dignissimos minus eveniet nihil
                                                expedita. Expedita quae eveniet nemo rem.
                                            </p>
                                        </div>
                                    </div>
                                    <hr className="my-3" />
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
                                                <a href="https://www.google.com"  className="ms-2 ml-2 text-decoration-none text-dark">+212 6 37 21 20 54</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-0 rounded shadow-sm mb-3 p-3">
                                    <div className="card-body">
                                        <h2 className="card-title fs-3 fw-bold mb-4">Testimonial</h2>
                                        <div className="mb-5">
                                            <div>
                                                <div className="border-start border-5 border-primary ps-4">
                                                    <p>
                                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                                        Dolore corrupti animi aperiam, corporis, rem quisquam
                                                        sapiente nihil dicta culpa repellendus sequi voluptatum
                                                        enim similique saepe! Cumque eos labore sunt quisquam.
                                                    </p>
                                                </div>
                                                <div clasName="ps-4 border-start border-5 border-white">
                                                    <p className="mb-0 fw-bolder text-secondary">Name</p>
                                                    <p className="text-muted">Position, Project Name</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-0 rounded shadow-sm mb-3 p-3">
                                    <div className="card-body">
                                        <h2 className="card-title fs-3 fw-bold mb-4">Education</h2>
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
                                                <p className="fw-bold text-secondary mb-0">School/College Name</p>
                                                <p className="text-muted">BE (2019 - Current)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-0 rounded shadow-sm p-3">
                                    <div className="card-body">
                                        <h2 className="card-title fs-3 fw-bold mb-4">Languages</h2>
                                        <div className="
                  d-flex
                  flex-column
                  align-items-start
                  justify-content-center
                  mb-3
                ">
                                            <p className="text-muted mb-1">
                                                <span className="fw-bold text-secondary">Arabic: </span>Proficient
                                            </p>
                                            <p className="text-muted mb-1">
                                                <span className="fw-bold text-secondary">English: </span>Proficient
                                            </p>
                                            <p className="text-muted mb-1">
                                                <span className="fw-bold text-secondary">French: </span>Proficient
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
                            </div>
                        </div>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
                </body>


            </div >
        )

    }

}
export default Cv;
