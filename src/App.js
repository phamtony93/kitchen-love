import React, { useState } from 'react';
import Login from './screens/Login'
import Feed from './screens/Feed'
import Profile from './screens/Profile'
import ForbiddenAccess from './screens/ForbiddenAccess'
import NotFound from './screens/NotFound'
import About from './screens/About'
import Contact from './screens/Contact'
import Cart from './screens/Cart'
import MainNavBar from './components/MainNavBar'
import Jumbotron from './components/Jumbotron'
import './components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom'
import { Layout } from './components/Layout';

function App() {
  let [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') === "true" ? true : false);
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
        <MainNavBar 
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          setRole={setRole}  
          />
        <Jumbotron/>
        <Layout>
          <Switch>
            <Route exact path='/' component={Feed} />
            <Route path='/login' render={(props) => {
              return <Login 
                {...props}
                setAuthenticated={setAuthenticated}
                setRole={setRole}
                authenticated={authenticated} />
            }} />
            <Route path='/about' component= {About} />
            <Route path='/contact' component= {Contact} />
            <Route path='/profile' component={Profile} />
            <Route path='/cart' component={Cart} />
            <Route path='/404' component= {ForbiddenAccess} />
            <Route component={NotFound} />
          </Switch>
        </Layout>

      </Router>
    </div>
  );
}

export default App;
