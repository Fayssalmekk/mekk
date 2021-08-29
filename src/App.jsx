import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Banner from './Components/Banner/Banner';
import NavBar2 from './Components/NavBar/NavBar';
import Gall2 from './Components/Gall/Gall2';
import Gall3 from './Components/Gall/Gall3';




import Gall from './Components/Gall/Gall';



import Cv from './Components/Cv/Cv'




class App extends Component {



  render() {
    return (
      <Router>
        <div className="app ">
          <Redirect from="/" to="aboutme" />
          <Switch>

            <Route exact path="/aboutme" >

              <Banner />
              <NavBar2 />
              <Cv />
           

            </Route>
            <Route exact path="/uiux">

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

            </Route>



          </Switch>
          <div className="text-muted mt-4 mb-4"> Faymekk.ml &#169; 2021</div>
        </div>

      </Router>
    );
  }
}
export default App;