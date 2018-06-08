import * as React from 'react';
import { IEmployee } from '../../store/reducers/employees';
import EmployeeCard from '../employee/employee-card';
import { deleteEmployee, updateAlert, IAlertPayload, IAlert } from '../../store/actions';
import { connect } from 'react-redux';
import { IState } from '../../store/store';

interface IProps {
	employees: IEmployee[];
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
class ListEmployees extends React.Component<IProps & IDispatchProps> {
	public render() {
		return (
			<div className="cards-container">
				{this.props.employees.map(((employee) =>
					<div className="card" key={employee.id}>
						<EmployeeCard 
							employee={employee}
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
		);
	}
}

export default connect(
	(state: IState) => {
		const props: IProps = {
			employees: state.employees
		};
		return props;
	}, {
		deleteEmployee,
		updateAlert
	}
)(ListEmployees);
