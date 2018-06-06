import * as React from 'react';
import './App.css';
import { IUpdateEmployee, updateEmployee, selectEmployee, ISelectEmployee } from './store/actions';
import { connect } from 'react-redux';
import AddEmployee from './components/add-employee';
import ListEmployees from './components/list-employee';
import { IState } from './store/store';
import { IEmployee } from './store/reducers/employees';

interface IProps {
  employees: IEmployee[];
  selectedEmployee: IEmployee | null;
}

interface IAppDispatchProps {
  updateEmployee: (id: number) => IUpdateEmployee;
  selectEmployee: (id: number) => ISelectEmployee;
}

class App extends React.Component<IProps & IAppDispatchProps> {
  public render() {
    return (
      <div className="App">
        <h1>Experience Tracker</h1>
        <AddEmployee />
        <h3>Employees</h3>
        <ListEmployees 
          employees={this.props.employees}
          onClick={this.props.selectEmployee} />
      </div>
    );
  }
}

export default connect(
  (state: IState) => {
    console.log(state);
    const props: IProps = {
      employees: state.employees.allEmployees,
      selectedEmployee: state.employees.selected
    };
    return props;
  },
  {
    updateEmployee,
    selectEmployee
  }
)(App);
