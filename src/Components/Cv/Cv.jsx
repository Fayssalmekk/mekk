import React from 'react';
import Logo2 from '../../Assets/Logo2.png';
import data from './data';
import Skeleton from 'react-loading-skeleton';
import Profile from '../../Assets/profile.jpeg';
import CV from '../../Assets/CV.pdf';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';

import "./Cv.css"

class Cv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            loading: true
        };
        this.unsubscribe = null;
    }

    componentDidMount() {
        this.loadCVData();
    }

    componentWillUnmount() {
        // Unsubscribe from real-time updates when component unmounts
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    loadCVData = () => {
        try {
            const dbRef = ref(database, 'cv_data');
            // Set up real-time listener
            this.unsubscribe = onValue(dbRef, (snapshot) => {
                if (snapshot.exists()) {
                    this.setState({ data: snapshot.val(), loading: false });
                } else {
                    this.setState({ data: data, loading: false });
                }
            }, (error) => {
                console.error('Error loading CV data:', error);
                this.setState({ data: data, loading: false });
            });
        } catch (error) {
            console.error('Error setting up listener:', error);
            this.setState({ data: data, loading: false });
        }
    }

    renderLoadingSkeleton = () => {
        return (
            <div className="cv body animation">
                <body className="container mt-3 bg-light">
                    <div className="h-10 bg-white border-0 mb-5 shadow-sm">
                        <div className="card-body d-flex align-items-center justify-content-start p-5 flex-sm-column flex-column flex-md-row">
                            <Skeleton circle={true} width={200} height={200} style={{ marginBottom: '16px' }} />
                            <div style={{ marginLeft: '32px', flex: 1 }}>
                                <Skeleton width="50%" height={40} style={{ marginBottom: '8px' }} />
                                <Skeleton width="40%" height={20} style={{ marginBottom: '16px' }} />
                                <div className="d-flex gap-2">
                                    {[...Array(4)].map((_, i) => (
                                        <Skeleton key={i} circle={true} width={40} height={40} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="row pb-5">
                            <div className="col-12 col-lg-8 overflow-auto">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="card rounded border-0 mb-3 shadow-sm p-3">
                                        <div className="card-body">
                                            <Skeleton width="30%" height={28} style={{ marginBottom: '16px' }} />
                                            {[...Array(3)].map((_, j) => (
                                                <Skeleton key={j} count={2} style={{ marginBottom: '12px', height: 16 }} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-0 col-lg-4 overflow-auto">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="card border-0 rounded shadow-sm mb-3 p-3">
                                        <div className="card-body">
                                            <Skeleton width="40%" height={24} style={{ marginBottom: '12px' }} />
                                            <Skeleton count={3} height={16} style={{ marginBottom: '8px' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </body>
            </div>
        );
    }

    render() {
        const { data: cvData, loading } = this.state;
        
        if (loading) {
            return this.renderLoadingSkeleton();
        }

        return (
            <div className="cv body animation ">
                <body className="container  mt-3 bg-light">
                    <div className=" h-10  bg-white border-0 mb-5 shadow-sm">
                        <div className=" card-body d-flex align-items-center justify-content-start p-5 flex-sm-column flex-column flex-md-row">
                            <img src={Profile} className="rounded-circle bg-secondary mb-sm-4 mb-4 mb-md-0" alt="profil" width="200" />
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
                                <h1 className="name  ml-md-5 mb-0">{cvData.name || <Skeleton/>}</h1>
                                <p className="job ml-md-5 mb-md-4 mt-1">{cvData.title || <Skeleton/>}</p>
                                <div className="d-flex align-items-center justify-content-between">
                                    <button onClick={() => window.open(cvData.github)} className="btn btn-dark rounded-circle ml-md-5 fs-4 p-0" style={{ height: "40px", width: "40px" }}>
                                        {<i className=" fa fa-github"></i> || <Skeleton circle={true} width={40} height={40} /> }
                                    </button>
                                    <button onClick={() => window.open(cvData.linkedin)} className="btn btn-primary rounded-circle ms-2 ml-2 fs-4 p-0" style={{ height: "40px", width: "40px" }}>
                                        <i className=" fa fa-linkedin"></i>
                                    </button>
                                    <button onClick={() => window.open(cvData.instagram)} className="btn btn-danger rounded-circle ms-2 fs-4 ml-2 p-0" style={{ height: "40px", width: "40px" }}>
                                        <i className=" fa fa-instagram"></i>
                                    </button>
                                    <button onClick={() => window.open(cvData.facebook)} className="btn btn-info text-white rounded-circle ml-2 ms-2 fs-4 p-0" style={{ height: "40px", width: "40px" }}>
                                        <i className=" fa fa-facebook "></i>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-fill d-flex  justify-content-md-end">
                                <img src={Logo2} alt="Logo" className="" />

                            </div>

                        </div>
                    </div>

                    <div className=" ">
                        <div className="row pb-5">
                            <div className="col-12 col-lg-8 overflow-auto">
                                <div className="card rounded border-0 mb-3 shadow-sm p-3">
                                    <div className="card-body">
                                        <h2 className="card-title fs-1 mb-5 fw-bold"><i className="fa fa-user"> </i> About Me</h2>
                                        <p className="card-text">
                                            {cvData.about}
                                        </p>
                                    </div>
                                    <hr className="my-1" />
                                </div>


                                <div className="card border-0 rounded shadow-sm mb-3 p-3">
                                    <div className="card-body">
                                        <h2 className="card-title mb-5 fs-1 fw-bold"><i className="fa fa-rocket"> </i> Projects</h2>
                                        <div>
                                            {cvData.projects && cvData.projects.map((project, index) => (
                                                <div key={project.id || index} className={index > 0 ? "mt-3" : ""}>
                                                    <p>
                                                        <a href={project.link}> <span className="fw-bold  fs-5"></span><span className="txthead">&bull; {project.title} : <i className="fa fa-external-link "> </i> </span> </a>
                                                    </p>
                                                    <p>
                                                        {project.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <hr className="my-1" />


                                </div>

                                <div className="card border-0 rounded shadow-sm p-3 mb-3">
                                    <div className="card-body">
                                        <h2 className="card-title fs-1 mb-5 fw-bold"><i className="fa fa-suitcase "> </i> Experience</h2>
                                        <div>
                                            {cvData.experience && cvData.experience.map((exp, index) => (
                                                <div key={exp.id || index} className={index !== 0 ? "mt-3" : ""}>
                                                    <p>
                                                        <span className="fw-bold  fs-5"></span><span className="txthead">&bull; {exp.position} at <a href={exp.link}>{exp.company}</a><span className="text-muted"> ({exp.month || exp.startYear} - {exp.endYear})</span>  </span>
                                                    </p>
                                                    <p>
                                                        {exp.description}
                                                    </p>
                                                </div>
                                            ))}
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
                                                <span className="ms-2 ml-3"> {cvData.location}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center mb-2">
                                                <i className="faa fa fa-envelope"></i>
                                                <a href={`mailto:${cvData.email}`} className="ms-2 ml-2 text-decoration-none text-dark">{cvData.email}</a>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center mb-2">
                                                <i className="faa fa fa-phone"></i>
                                                <a href="https://www.google.com" className="ms-2 ml-2 text-decoration-none text-dark">{cvData.phone}</a>
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
                                                        {cvData.skills && cvData.skills.map((skill, index) => (
                                                            <p key={index}>{skill}</p>
                                                        ))}
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
                                                {cvData.education && cvData.education.map((edu, index) => (
                                                    <p key={edu.id || index} className="card-text">&bull; {edu.school} ({edu.years}) </p>
                                                ))}
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
                                            {cvData.languages && cvData.languages.map((lang, index) => (
                                                <p key={lang.id || index} className=" mb-1">
                                                    <span className="card-text">{lang.language} </span><span className="stars"> {'★'.repeat(lang.level)}{'☆'.repeat(5 - lang.level)}</span>
                                                </p>
                                            ))}
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
                                    <a href={CV} download className="text-center button" rel="noopener noreferrer">
                                        <i className="fa fa-download">  </i> Download My CV
                                    </a>
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
