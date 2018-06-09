import * as React from 'react';
import { IEmployee } from '../../store/reducers/employees';
import EmployeeCard from '../employee/employee-card';
import { deleteEmployee, updateAlert, IAlertPayload, IAlert } from '../../store/actions';
import { connect } from 'react-redux';
import { IState } from '../../store/store';
import { checkMaxSimultaneous } from '../../services/competency-checker';
import { TextField, InputAdornment } from '@material-ui/core';
import IconSearch from '@material-ui/icons/Search';

interface IProps {
	employees: IEmployee[];
	maxSimultaneousCompetencies: number;
}

interface IListEmployeeState {
	search: string;
}

interface IDispatchProps {
	deleteEmployee: (id: number) => void;
	updateAlert: (Message: IAlertPayload) => IAlert;
}
/**
 * View for listing employees
 *
 * @class ListEmployees
 * @extends {(React.Component<IProps & IDispatchProps>)}
 */
class ListEmployees extends React.Component<IProps & IDispatchProps, IListEmployeeState> {
	public state: IListEmployeeState = {
		search: ''
	};

	public render() {
		const filteredEmployees = this.props.employees
			.filter((e) =>
				e.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== - 1 ||
				e.competencies.filter((c) => c.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== - 1).length > 0
			);
		return (
			<div>
				<TextField
          id="search"
          label="Search"
          value={this.state.search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						this.setState({
							search: event.target.value
						});
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<IconSearch />
							</InputAdornment>
						),
					}}
          margin="normal"
        />
				<div className="cards-container">
					{filteredEmployees.map(((employee) =>
						<div className="card" key={employee.id}>
							<EmployeeCard
								employee={employee}
								exceedsMaxSimultaneousCompetencies={
									checkMaxSimultaneous(
										employee.competencies,
										employee.totalYearsExperience,
										this.props.maxSimultaneousCompetencies
									)
								}
								deleteClickHandler={(id: number) => {
									this.props.updateAlert({
										messageTitle: 'Delete Employee',
										messageContent: `Are you sure you want to delete employee: ${employee.name}?`,
										action: () => this.props.deleteEmployee(employee.id)
									});
								}}
							/>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default connect(
	(state: IState) => {
		const props: IProps = {
			employees: state.employees,
			maxSimultaneousCompetencies: state.maxSimultaneousCompetencies
		};
		return props;
	}, {
		deleteEmployee,
		updateAlert
	}
)(ListEmployees);

export { ListEmployees as PureListEmployees};
