import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/home';
import UpdateEmployee from './components/employee/update-employee';
import AlertManager from './components/alert/alert-manager';
import MainAppBar from './components/app-bar';
import Admin from './components/admin';
import SingleEmployee from './components/employee/single-employee';
/**
 * Main app component defines the routes
 *
 * @export
 * @class App
 * @extends {React.Component}
 */
export default class App extends React.Component {
  public render() {
    return (
      <Router>
        <div>
          <MainAppBar />
          <div className="App">
            <Route path="/" exact={true} component={Home} />
            <Route path="/admin" component={Admin} />
            <Route path="/employee/:employeeId" component={SingleEmployee} />
            <Route path="/add-employee" component={UpdateEmployee} />
            <Route path="/edit-employee/:employeeId" component={UpdateEmployee} />
            <AlertManager />
          </div>
        </div>
      </Router>
    );
  }
}
