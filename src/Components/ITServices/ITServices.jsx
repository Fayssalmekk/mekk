import React from 'react';
import './ITServices.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import data from '../Cv/data';

class ITServices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cvData: data,
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
                    this.setState({ cvData: snapshot.val(), loading: false });
                } else {
                    this.setState({ cvData: data, loading: false });
                }
            }, (error) => {
                console.error('Error loading CV data:', error);
                this.setState({ cvData: data, loading: false });
            });
        } catch (error) {
            console.error('Error setting up listener:', error);
            this.setState({ cvData: data, loading: false });
        }
    }

    renderLoadingSkeleton = () => {
        return (
            <div className="it-services-page animation">
                <div className="it-container">
                    <h1 className="it-title">IT Services</h1>
                    
                    <div className="it-section">
                        <h2 className="it-section-title">Tools & Technologies</h2>
                        <div className="it-tools-grid">
                            {[...Array(15)].map((_, i) => (
                                <Skeleton key={i} width="100%" height={120} borderRadius={12} />
                            ))}
                        </div>
                    </div>

                    <div className="it-section mt-5">
                        <h2 className="it-section-title">Certifications</h2>
                        <div className="it-certifications-container">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} width="100%" height={100} borderRadius={8} style={{ marginBottom: '16px' }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { cvData, loading } = this.state;

        if (loading) {
            return this.renderLoadingSkeleton();
        }

        const itServices = cvData.itServices || data.itServices;

        return (
            <div className="it-services-page animation">
                <div className="it-container">
                    <h1 className="it-title">IT Services & Technologies</h1>
                    
                    <div className="it-section">
                        <h2 className="it-section-title">Tools & Technologies</h2>
                        <div className="it-tools-grid">
                            {itServices && itServices.tools && itServices.tools.map((tool, index) => (
                                <div key={index} className="it-tool-card">
                                    <div className="it-tool-icon">
                                        <img src={tool.icon} alt={tool.name} title={tool.name} />
                                    </div>
                                    <p className="it-tool-name">{tool.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {itServices && itServices.certifications && itServices.certifications.length > 0 && (
                        <div className="it-section mt-5 pt-5">
                            <h2 className="it-section-title">Certifications</h2>
                            <div className="it-certifications-container">
                                {itServices.certifications.map((cert, index) => (
                                    <div key={cert.id || index} className="it-cert-card">
                                        <div className="it-cert-badge">
                                            <i className="fa fa-certificate"></i>
                                        </div>
                                        <h3 className="it-cert-name">{cert.name}</h3>
                                        <p className="it-cert-issuer">{cert.issuer}</p>
                                        <p className="it-cert-year">{cert.year}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ITServices;
