import * as React from 'react';
import './App.css';
import { IAddEmployee, IUpdateEmployee, addEmployee, updateEmployee, selectEmployee, ISelectEmployee } from './store/actions';
import { connect } from 'react-redux';
import AddEmployee from './components/add-employee';
import ListEmployees from './components/list-employee';
import { IState } from './store/store';
import { IEmployee } from './store/reducers/employees';
import Employee from './components/employee';
import { ICompetence } from './store/reducers/competencies';

interface IProps {
  employees: IEmployee[];
  selectedEmployee: IEmployee | null;
}

interface IAppDispatchProps {
  addEmployee: (
    title: string,
    years: number,
    competencies: ICompetence[]) => IAddEmployee;
  updateEmployee: (id: number) => IUpdateEmployee;
  selectEmployee: (id: number) => ISelectEmployee;
}
class App extends React.Component<IProps & IAppDispatchProps> {
  public render() {
    return (
      <div className="App">
        <h1>Experience Tracker</h1>
        <AddEmployee 
          onClick={this.props.addEmployee}
        />
        <h3>Employees</h3>
        <ListEmployees 
          employees={this.props.employees}
          onClick={this.props.selectEmployee} />
        
        {this.props.selectedEmployee && 
        <div>
          <h3>Selected Employee</h3>
          <p><Employee employee={this.props.selectedEmployee}/></p>
        </div>
        }
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
    addEmployee,
    updateEmployee,
    selectEmployee
  }
)(App);
