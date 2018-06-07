import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { IEmployee } from '../store/reducers/employees';
import { connect } from 'react-redux';
import { IState } from '../store/store';
import EmployeeForm from './employee-form';
import { ICompetence } from '../store/reducers/employees';
import { IAddEmployee, addEmployee, updateEmployee, IUpdateEmployee } from '../store/actions';

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

class UpdateEmployee extends React.Component<IProps & IAddEmployeeDispatchProps> {
	public render() {
		if (this.props.match.params.employeeId) {
			const id: number = parseInt(this.props.match.params.employeeId, 10);
			const employee = this.props.employees.find(((e) => e.id === id));
			if (employee) {
				return (
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
						previousCompetencies={this.getPreviousCompetencies()}
					/>
				);
			}
			return (
				<Redirect to="/" />
			);
		}
		return (
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
				previousCompetencies={this.getPreviousCompetencies()}
			/>
		);
	}
	private getPreviousCompetencies(): string[] {
		if (this.props.employees.length === 0) {
			return [];
		}
		return this.props.employees
			.map((employee) => {
				return employee.competencies.map((c) => c.title);
			})
			.reduce((a, b) => [...a, ...b])
			.sort()
			.filter((item, i, arr) => {
				return !i || item !== arr[i - 1];
			});
	}
}

export default connect(
	(state: IState) => {
		return {
			maxSimultaneousCompetencies: state.maxSimultaneousCompetencies,
			employees: state.employees
		};
	},
	{
		addEmployee,
		updateEmployee
	}
)(UpdateEmployee);
