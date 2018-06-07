import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/home';
import UpdateEmployee from './components/update-employee';

export default class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <h1>Experience Tracker</h1>
          <Route exact={true} path={'/'} component={Home} />
          <Route path={'/add-employee'} component={UpdateEmployee} />
          <Route path={'/edit-employee/:employeeId'} component={UpdateEmployee} />
        </div>
      </Router>
    );
  }
}
