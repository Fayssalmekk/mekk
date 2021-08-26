import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Banner from './Components/Banner/Banner';
import NavBar2 from './Components/NavBar/NavBar';
import Gall2 from './Components/Gall/Gall2';




import Gall from './Components/Gall/Gall';



import Cv from './Components/Cv/Cv'




class App extends Component {
  
  
 
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            
            <Route exact path="/">
              
              <Banner />
              <NavBar2/>
              <Cv/>
              
            </Route>
            <Route exact path="/uiux">
              
              <Banner/>
              <NavBar2/>
              <Gall/>
              
            </Route>
            <Route exact path="/flyers">
              
              <Banner />
              <NavBar2/>
              <Gall2/>
              
            </Route>
            <Route exact path="/artworks">
              
              <Banner />
              <NavBar2/>
              
            </Route>
            <Route exact path="/manip">
              
              <Banner />
              <NavBar2/>
              
            </Route>
            
             
            
          </Switch>
        </div>
      
      </Router>
    );
  }
}
export default App;