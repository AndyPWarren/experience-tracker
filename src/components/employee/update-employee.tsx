import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { IEmployee } from '../../store/reducers/employees';
import { connect } from 'react-redux';
import { IState } from '../../store/store';
import EmployeeForm from '../employee/employee-form';
import { ICompetence } from '../../store/reducers/employees';
import { IAddEmployee, addEmployee, updateEmployee, IUpdateEmployee } from '../../store/actions';
import { Typography } from '@material-ui/core';
import { getPreviousCompetencies } from '../../services/competeny-helpers';

interface IParams {
	employeeId: string;
}

interface IAddEmployeeDispatchProps {
	addEmployee: (
		title: string,
		years: number,
		competencies: ICompetence[]) => IAddEmployee;
	updateEmployee: (
		id: number,
		name: string,
		years: number,
		competencies: ICompetence[]) => IUpdateEmployee;
}

interface IProps extends RouteComponentProps<IParams> {
	employees: IEmployee[];
	maxSimultaneousCompetencies: number;
}
/**
 * Managers whether the user is editing or adding an employee
 * sets the employee form component based on that
 *
 * @class UpdateEmployee
 * @extends {(React.Component<IProps & IAddEmployeeDispatchProps>)}
 */
class UpdateEmployee extends React.Component<IProps & IAddEmployeeDispatchProps> {
	public render() {
		if (this.props.match.params.employeeId) {
			const id: number = parseInt(this.props.match.params.employeeId, 10);
			const employee = this.props.employees.find(((e) => e.id === id));
			if (employee) {
				return (
					<div>
						<Typography variant="display1" gutterBottom={true}>Edit Employee</Typography>
						<EmployeeForm
							maxSimultaneousCompetencies={this.props.maxSimultaneousCompetencies}
							employee={employee}
							onSubmit={(name: string, years: number, competencies: ICompetence[]) => {
								this.props.updateEmployee(
									id,
									name,
									years,
									competencies
								);
							}}
							previousCompetencies={getPreviousCompetencies(this.props.employees)}
						/>
					</div>
				);
			}
			return (
				<Redirect to="/" />
			);
		}
		return (
			<div>
				<Typography variant="display1" gutterBottom={true}>Add Employee</Typography>
				<EmployeeForm
					maxSimultaneousCompetencies={this.props.maxSimultaneousCompetencies}
					employee={null}
					onSubmit={(name: string, years: number, competencies: ICompetence[]) => {
						this.props.addEmployee(
							name,
							years,
							competencies
						);
					}}
					previousCompetencies={getPreviousCompetencies(this.props.employees)}
				/>
			</div>
		);
	}
}

export default connect(
	(state: IState) => {
		return {
			maxSimultaneousCompetencies: state.maxSimultaneousCompetencies,
			employees: state.employees.current
		};
	},
	{
		addEmployee,
		updateEmployee
	}
)(UpdateEmployee);
