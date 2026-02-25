import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Banner from './Components/Banner/Banner';
import NavBar2 from './Components/NavBar/NavBar';
import Gall2 from './Components/Gall/Gall2';
import Gall3 from './Components/Gall/Gall3';
import Gall4 from './Components/Gall/Gall4';
import AdminPanel from './Components/Cv/AdminPanel';
import ITServices from './Components/ITServices/ITServices';
import RamadanTracker from './Components/Ramadan/RamadanTracker';
import { ThemeProvider } from './ThemeContext';
import "./index.css"

import Gall from './Components/Gall/Gall';
import Cv from './Components/Cv/Cv'

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <Router>
          <h1 className="none" >FAYSSAL EL MEKKAOUI PORTFOLIO INPT GRAPHIC DESIGNER DEVOPS ENGINEER CLOUD KUBERNETES DOCKER AUTOMATION</h1>
          <div className="app">
            <Switch>
              <Route exact path="/" >
                <Redirect to="/about-me" />
              </Route>
              <Route exact path="/about-me" >
                <Banner />
                <NavBar2 />
                <Cv />
              </Route>
              <Route exact path="/admin0" >
                <AdminPanel fullpage={true} onClose={() => window.history.back()} data={{}} onDataUpdate={() => {}} />
              </Route>
              <Route exact path="/ui-ux">
                <Banner />
                <NavBar2 />
                <Gall />
              </Route>
              <Route exact path="/prints">
                <Banner />
                <NavBar2 />
                <Gall2 />
              </Route>
              <Route exact path="/logos">
                <Banner />
                <NavBar2 />
                <Gall3/>
              </Route>
              <Route exact path="/artworks">
                <Banner />
                <NavBar2 />
                <Gall4/>
              </Route>
              <Route exact path="/it-services">
                <Banner />
                <NavBar2 />
                <ITServices/>
              </Route>
              <Route exact path="/ramadan">
                <RamadanTracker />
              </Route>
            </Switch>
            {window.location.pathname !== '/admin0' && window.location.pathname !== '/ramadan' && <div className="text-muted mt-4 mb-4"> Faymekk.ml &#169; 2021</div>}
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}
export default App;