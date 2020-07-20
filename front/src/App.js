import React, { useEffect } from 'react';
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
import { getUser } from './app.api';
import { useRecoilState } from 'recoil';
import { currentUserState } from './recoil/atoms';
import Tournaments from './pages/tournaments/Tournaments.component';
import Teams from './pages/teams/Teams.component';
import CreateTeam from './components/CreateTeam.component';
import CreateTournament from './components/CreateTournament';
import MatchStart from './components/MatchStart.component';

function App() {
  const [currentUser,setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    if (document.cookie.includes('jwt')) {
      getUser().then(res => {
        setCurrentUser(res.data.player)
      }).catch();
    }
  }, [])

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
          <Matches />
        </Route>
        <Route path="/createTeam" exact>
          <CreateTeam />
        </Route>
        <Route path="/createTournament" exact>
          <CreateTournament />
        </Route>
        <Route path="/tournaments" exact>
          <Tournaments />
        </Route>
        <Route path="/teams" exact>
          <Teams />
        </Route>
        <Route path="/startMatch" exact>
          <MatchStart />
        </Route>
        <Route path="/match/:matchId" exact>
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
