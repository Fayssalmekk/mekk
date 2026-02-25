import React from 'react';
import Logo2 from '../../Assets/Logo2.png';
import mainLogo from '../../Assets/mainLogo.png';
import data from './data';
import Skeleton from 'react-loading-skeleton';
import Profile from '../../Assets/profile.jpeg';
import CV from '../../Assets/CV.pdf';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { ThemeContext } from '../../ThemeContext';

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
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    loadCVData = () => {
        try {
            const dbRef = ref(database, 'cv_data');
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
                <div className="container mt-3 cv-container">
                    <div className="cv-header-card cv-card">
                        <div className="cv-header-content">
                            <Skeleton circle={true} width={150} height={150} />
                            <div className="cv-header-info">
                                <Skeleton width="60%" height={40} style={{ marginBottom: '8px' }} />
                                <Skeleton width="40%" height={20} style={{ marginBottom: '16px' }} />
                                <div className="d-flex gap-2">
                                    {[...Array(4)].map((_, i) => (
                                        <Skeleton key={i} circle={true} width={36} height={36} />
                                    ))}
                                </div>
                            </div>
                            <Skeleton width={80} height={80} />
                        </div>
                    </div>
                    <div className="cv-body">
                        <div className="cv-main">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="cv-section cv-card">
                                    <Skeleton width="30%" height={28} style={{ marginBottom: '16px' }} />
                                    <Skeleton count={4} style={{ marginBottom: '12px', height: 16 }} />
                                </div>
                            ))}
                        </div>
                        <div className="cv-sidebar">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="cv-section cv-card">
                                    <Skeleton width="50%" height={24} style={{ marginBottom: '12px' }} />
                                    <Skeleton count={3} height={16} style={{ marginBottom: '8px' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { data: cvData, loading } = this.state;
        
        if (loading) {
            return this.renderLoadingSkeleton();
        }

        return (
            <ThemeContext.Consumer>
                {({ isDarkMode }) => (
                    <div className="cv body animation">
                        <div className="container mt-3 cv-container">
                            {/* CV Header */}
                            <div className="cv-header-card cv-card">
                                <div className="cv-header-content">
                                    <img 
                                        src={Profile} 
                                        className="profile-img" 
                                        alt="profile" 
                                    />
                                    <div className="cv-header-info">
                                        <h1 className="cv-name">{cvData.name || <Skeleton/>}</h1>
                                        <p className="cv-title">{cvData.title || <Skeleton/>}</p>
                                        <div className="social-btns">
                                            <button onClick={() => window.open(cvData.github)} className="social-btn github" title="GitHub">
                                                <i className="fa fa-github"></i>
                                            </button>
                                            <button onClick={() => window.open(cvData.linkedin)} className="social-btn linkedin" title="LinkedIn">
                                                <i className="fa fa-linkedin"></i>
                                            </button>
                                            <button onClick={() => window.open(cvData.instagram)} className="social-btn instagram" title="Instagram">
                                                <i className="fa fa-instagram"></i>
                                            </button>
                                            <button onClick={() => window.open(cvData.facebook)} className="social-btn facebook" title="Facebook">
                                                <i className="fa fa-facebook"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <img 
                                        src={isDarkMode ? mainLogo : Logo2} 
                                        alt="Logo" 
                                        className="cv-logo"
                                    />
                                </div>
                            </div>

                            {/* CV Body */}
                            <div className="cv-body">
                                {/* Main Content */}
                                <div className="cv-main">
                                    {/* About Me */}
                                    <div className="cv-section cv-card">
                                        <h2 className="cv-section-title">
                                            <span className="section-icon"><i className="fa fa-user"></i></span>
                                            About Me
                                        </h2>
                                        <p className="cv-text">{cvData.about}</p>
                                    </div>

                                    {/* Projects */}
                                    <div className="cv-section cv-card">
                                        <h2 className="cv-section-title">
                                            <span className="section-icon"><i className="fa fa-rocket"></i></span>
                                            Projects
                                        </h2>
                                        <div className="projects-list">
                                            {cvData.projects && cvData.projects.map((project, index) => (
                                                <div key={project.id || index} className="project-item">
                                                    <h3 className="project-title">
                                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                            <i className="fa fa-external-link"></i> {project.title}
                                                        </a>
                                                    </h3>
                                                    <p className="cv-text">{project.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Experience */}
                                    <div className="cv-section cv-card">
                                        <h2 className="cv-section-title">
                                            <span className="section-icon"><i className="fa fa-suitcase"></i></span>
                                            Experience
                                        </h2>
                                        <div className="experience-list">
                                            {cvData.experience && cvData.experience.map((exp, index) => (
                                                <div key={exp.id || index} className="experience-item">
                                                    <div className="experience-header">
                                                        <h3 className="experience-position">{exp.position}</h3>
                                                        <span className="experience-date">
                                                            {exp.month || exp.startYear} - {exp.endYear}
                                                        </span>
                                                    </div>
                                                    <p className="experience-company">
                                                        <a href={exp.link}>{exp.company}</a>
                                                    </p>
                                                    <p className="cv-text">{exp.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="cv-sidebar">
                                    {/* Contact */}
                                    <div className="cv-section cv-card">
                                        <h2 className="cv-section-title">
                                            <span className="section-icon"><i className="fa fa-address-card"></i></span>
                                            Contact
                                        </h2>
                                        <div className="contact-list">
                                            <div className="contact-item">
                                                <i className="fa fa-map-marker"></i>
                                                <span>{cvData.location}</span>
                                            </div>
                                            <div className="contact-item">
                                                <i className="fa fa-envelope"></i>
                                                <a href={`mailto:${cvData.email}`}>{cvData.email}</a>
                                            </div>
                                            <div className="contact-item">
                                                <i className="fa fa-phone"></i>
                                                <span>{cvData.phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="cv-section cv-card">
                                        <h2 className="cv-section-title">
                                            <span className="section-icon"><i className="fa fa-code"></i></span>
                                            Skills
                                        </h2>
                                        <div className="skills-badges">
                                            {cvData.skills && cvData.skills.map((skill, index) => (
                                                <span key={index} className="skill-badge">{skill}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Education */}
                                    <div className="cv-section cv-card">
                                        <h2 className="cv-section-title">
                                            <span className="section-icon"><i className="fa fa-graduation-cap"></i></span>
                                            Education
                                        </h2>
                                        <div className="education-list">
                                            {cvData.education && cvData.education.map((edu, index) => (
                                                <div key={edu.id || index} className="education-item">
                                                    <i className="fa fa-university"></i>
                                                    <div>
                                                        <p className="education-school">{edu.school}</p>
                                                        <span className="education-years">{edu.years}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Languages */}
                                    <div className="cv-section cv-card">
                                        <h2 className="cv-section-title">
                                            <span className="section-icon"><i className="fa fa-language"></i></span>
                                            Languages
                                        </h2>
                                        <div className="languages-list">
                                            {cvData.languages && cvData.languages.map((lang, index) => (
                                                <div key={lang.id || index} className="language-item">
                                                    <span className="language-name">{lang.language}</span>
                                                    <div className="language-level">
                                                        {'★'.repeat(lang.level)}{'☆'.repeat(5 - lang.level)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Download CV Button */}
                                    <button className="download-btn" onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = CV;
                                        link.download = 'CV.pdf';
                                        link.target = '_blank';
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}>
                                        <i className="fa fa-download"></i>
                                        <span>Download CV</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default Cv;