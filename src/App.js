import React, { useState } from 'react';
import Login from './screens/Login'
import Feed from './screens/Feed'
import Profile from './screens/Profile'
import ForbiddenAccess from './screens/ForbiddenAccess'
import NotFound from './screens/NotFound'
import MainNavBar from './components/MainNavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom'

function App() {
  let [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') === true ? true : false);
  let [ role, setRole] = useState(localStorage.getItem('role') ? localStorage.getItem('role') : 'anonymous');
  
  // const updateRole = (newVal) => {
  //   setRole(newVal);
  // }

  // const updateAuthentication = (newVal) => {
  //   setAuthenticated(newVal);
  // }
  
  return (
    <div className="App">
      <Router>
        <MainNavBar authenticated={authenticated}/>
        <Switch>
          <Route exact path='/' component={Feed} />
          <Route path='/login' render={(props) => {
            return <Login 
              {...props}
              setAuthenticated={setAuthenticated}
              setRole={setRole}
              authenticated={authenticated} />
          }} />
          <Route path='/profile' component={Profile} />
          <Route path='/404' component= {ForbiddenAccess} />
          <Route path='/403' component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
