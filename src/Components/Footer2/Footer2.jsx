import "./Footer2.css"
import React, { Component } from "react";
import content from '../../Contents/HomeContent'




class Footer2 extends Component {
    constructor(props) {
        super(props);
        this.Language = this.props.language;

    }


    render() {
        return (
            <div>
                <div className="footer-section">
                    <div className="container">
                        <h3 className="titlefoot" >{content.footertitle[this.Language]}</h3>
                        <div className="footdiv">
                            <p className="footcontent">{content.footer1[this.Language]} </p>
                            <p className="footcontent" >{content.footer2[this.Language]} </p>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default Footer2;