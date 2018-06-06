import * as React from 'react';
import './App.css';
import AddEmployee from './components/add-employee';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/home';

export default class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <h1>Experience Tracker</h1>
          <Route path={'/add-employee'} component={AddEmployee} />
          <Route exact={true} path={'/'} component={Home} />
        </div>
      </Router>
    );
  }
}
