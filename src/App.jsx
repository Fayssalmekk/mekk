import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Banner from './Components/Banner/Banner';
import NavBar2 from './Components/NavBar/NavBar';
import Cookies from 'universal-cookie';
import AboutUs from './Components/AboutUs/AboutUs';

import Footer from './Components/Footer/Footer';
import Footer2 from './Components/Footer2/Footer2';


import Carousel from './Components/Carousel/Carousel';
import Cv from './Components/Cv/Cv'


const cookies = new Cookies();


class App extends Component {
  constructor() {
    super();
    this.state = {
      language: cookies.get('language') == null ? "Fr" : cookies.get('language'),
      token: localStorage.getItem("accessToken")
    };
    console.log(this.state.token)
  }


  getLanguage(lang) {
    cookies.set('language', lang, { path: '/' });
    this.setState({
      language: cookies.get('language')
    })

  }
  
 
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/">
              
              <Banner language={this.state.language}/>
              <NavBar2/>
              
            </Route>
            <Route exact path="/aboutme">
              
              <Banner language={this.state.language}/>
              <NavBar2/>
              <Cv/>
              
            </Route>
            <Route exact path="/uiux">
              
              <Banner language={this.state.language}/>
              <NavBar2/>
              
            </Route>
            <Route exact path="/flyers">
              
              <Banner language={this.state.language}/>
              <NavBar2/>
              
            </Route>
            <Route exact path="/artworks">
              
              <Banner language={this.state.language}/>
              <NavBar2/>
              
            </Route>
            <Route exact path="/manip">
              
              <Banner language={this.state.language}/>
              <NavBar2/>
              
            </Route>
            
             
            
          </Switch>
        </div>
      
      </Router>
    );
  }
}
export default App;