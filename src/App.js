import React from 'react';
import Login from './screens/login'
import ForbiddenAccess from './screens/ForbiddenAccess'
import NotFound from './screens/NotFound'
import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch, Redirect } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/404' component= {ForbiddenAccess} />
          <Route path='/403' component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
