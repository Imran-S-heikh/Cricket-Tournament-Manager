import React, { useState } from 'react';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/landing/home';
import Nav from './components/compoundes/nav/navbar';
import Signup from './pages/signup/signup';
import Account from './pages/account/account';
import Login from './pages/login/login';

function App() {
  const [user,setUser] = useState({loggedIn: false});

  const handleUser = (data)=>{
    setUser({...user,...data})
  };

  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
        <Route path="/login" exact>
            <Login user={user} handleUser={handleUser} />
          </Route>
          <Route path="/signup" exact>
            <Signup user={user} handleUser={handleUser} />
          </Route>
          <Route path="/account" exact>
            <Account user={user} handleUser={handleUser}/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
