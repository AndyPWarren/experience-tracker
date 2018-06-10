import * as React from 'react';
import { IEmployee } from '../../store/reducers/employees';
import EmployeeCard from '../employee/employee-card';
import { deleteEmployee, updateAlert, IAlertPayload, IAlert } from '../../store/actions';
import { connect } from 'react-redux';
import { IState } from '../../store/store';
import { checkMaxSimultaneous, getPreviousCompetencies } from '../../services/competeny-helpers';
import IntegrationAutosuggest from '../inputs/autosuggest';

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
		const suggestedCompetencies = getPreviousCompetencies(this.props.employees);
		return (
			<div>
				<div className="search">
					<IntegrationAutosuggest 
						suggestions={suggestedCompetencies}
						value={this.state.search}
						changeHandler={(value: string) => {
							this.setState({
								search: value
							});
						}}
						placeholderText="Search for name or competence"
					/>
				</div>
				<div className="cards-container">
					{filteredEmployees.map((employee) =>
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
					)}
				</div>
			</div>
		);
	}
}

export default connect(
	(state: IState) => {
		const props: IProps = {
			employees: state.employees.current,
			maxSimultaneousCompetencies: state.maxSimultaneousCompetencies
		};
		return props;
	}, {
		deleteEmployee,
		updateAlert
	}
)(ListEmployees);

export { ListEmployees as PureListEmployees};
