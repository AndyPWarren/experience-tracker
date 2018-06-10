import * as React from 'react';
import { Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { IState } from '../store/store';
import { updateMaxSimCompetencies } from '../store/actions';
import NumberInput from './inputs/number-input';
import { IEmployee } from '../store/reducers/employees';
import { checkMaxSimultaneous } from '../services/competeny-helpers';
import SimpleEmployeesList from './employee/simple-list';
import { Link } from 'react-router-dom';

interface IProps {
	maxSimultaneousCompetencies: number;
	employees: IEmployee[];
}

interface IDispatchProps {
	updateMaxSimCompetencies: (value: number) => void;
}
/**
 * Admin view display editing the max simultaneous competencies variable
 *
 * @class Admin
 * @extends {(React.Component<IProps & IDispatchProps>)}
 */
class Admin extends React.Component<IProps & IDispatchProps> {
	public render() {
		const employeesBreakConstraint = this.employeesBreakCompetenciesLimit();
		return (
			<div>
				<Typography variant="display1" gutterBottom={true}>Admin</Typography>
				<Typography variant="body1">
					Max simultaneous competencies:
				</Typography>
				<NumberInput
					value={this.props.maxSimultaneousCompetencies}
					min={1}
					max={99}
					changeHandler={(value: number) => this.props.updateMaxSimCompetencies(value)}
				/>
				<Typography variant="title" gutterBottom={true}>
					Employees who break the max simultaneous competencies constraint
				</Typography>
				{employeesBreakConstraint.length > 0 &&
					<SimpleEmployeesList employees={this.employeesBreakCompetenciesLimit()}/>
				}
				<Link to="/admin/audit">
					<Button variant="raised" color="primary">
						Audit
					</Button>
				</Link>
			</div>
		);
	}

	private employeesBreakCompetenciesLimit(): IEmployee[] {
		return this.props.employees.filter((e) => {
			return checkMaxSimultaneous(
				e.competencies,
				e.totalYearsExperience,
				this.props.maxSimultaneousCompetencies
			);
		});
	}
}

export default connect(
	(state: IState) => {
		const props: IProps = {
			maxSimultaneousCompetencies: state.maxSimultaneousCompetencies,
			employees: state.employees.current
		};
		return props;
	}, {
		updateMaxSimCompetencies
	}
)(Admin);
