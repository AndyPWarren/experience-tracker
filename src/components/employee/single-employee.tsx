import * as React from 'react';
import { IEmployee } from '../../store/reducers/employees';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../store/store';
import Employee from './employee';
import { checkMaxSimultaneous } from '../../services/competency-helpers';

interface IParams {
	employeeId: string;
}

interface IProps extends RouteComponentProps<IParams> {
	employees: IEmployee[];
	maxSimultaneousCompetencies: number;
}
/**
 * View for a single employee
 *
 * @class SingleEmployee
 * @extends {React.Component<IProps>}
 */
class SingleEmployee extends React.Component<IProps> {
	public render() {
		const id: number = parseInt(this.props.match.params.employeeId, 10);
		if (!this.props.employees) {
			return this.renderRedirect();
		}
		const employee = this.props.employees.find(((e) => e.id === id));
		if (employee) {
			return (
				<Employee 
					employee={employee}
					exceedsMaxSimultaneousCompetencies={
						checkMaxSimultaneous(
							employee.competencies,
							employee.totalYearsExperience,
							this.props.maxSimultaneousCompetencies
						)
					}
				/>
			);
		} else {
			return this.renderRedirect();
		}
	}
	private renderRedirect() {
		return(
			<Redirect to="/" />
		);
	}
}

export default connect(
	(state: IState) => {
		console.log(state);
		return {
			employees: state.employees.current,
			maxSimultaneousCompetencies: state.maxSimultaneousCompetencies
		};
	}
)(SingleEmployee);
