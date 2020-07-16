import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './pages/Home.page';
import Header from './components/Header.component';
// import Footer from './components/Footer.component';
import Login from './pages/login/Login.component';
import Signup from './pages/signup/Signup.component';
import Profile from './pages/Profile.page';
import Match from './pages/match/Match.page';
import Matches from './pages/matches/Matches.page';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
         <Route path="/matches" exact>
          <Matches/>
        </Route>
        <Route path="/match/:id" exact>
          <Match />
        </Route>
         <Route path="/">
          <Home />
        </Route>
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
