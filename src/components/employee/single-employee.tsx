import * as React from 'react';
import { IEmployee } from '../../store/reducers/employees';
import { Typography, IconButton } from '@material-ui/core';
import CompetenciesViewTable from '../competencies/competencies-view-table';
import { RouteComponentProps, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../store/store';
import IconEdit from '@material-ui/icons/Edit';

interface IParams {
	employeeId: string;
}

interface IProps extends RouteComponentProps<IParams> {
	employees: IEmployee[];
}

class SingleEmployee extends React.Component<IProps> {
	public render() {
		const id: number = parseInt(this.props.match.params.employeeId, 10);
		if (!this.props.employees) {
			return this.renderRedirect();
		}
		const employee = this.props.employees.find(((e) => e.id === id));
		if (employee) {
			return (
				<div>
					<Typography variant="display1" gutterBottom={true}>
						Employee
					</Typography>
					<Typography variant="headline" gutterBottom={true}>
						{employee.name} 
						<Link to={`/edit-employee/${employee.id}`}>
							<IconButton>
								<IconEdit />
							</IconButton>
						</Link>
					</Typography>
					<Typography variant="body1" gutterBottom={true}>
						Total years experience: {employee.totalYearsExperience}
					</Typography>
					<br />
					{employee.competencies.length > 0 && 
					<CompetenciesViewTable competencies={employee.competencies}/>
					}
				</div>
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
			employees: state.employees
		};
	}
)(SingleEmployee);
