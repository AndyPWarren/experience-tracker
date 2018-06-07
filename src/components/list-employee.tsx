import * as React from 'react';
import { IEmployee } from '../store/reducers/employees';
import Employee from './employee';
import { deleteEmployee } from '../store/actions';
import { connect } from 'react-redux';
import { IState } from '../store/store';

interface IProps {
	employees: IEmployee[];
}

interface IDispatchProps {
	deleteEmployee: (id: number) => void;
}

class ListEmployees extends React.Component<IProps & IDispatchProps> {
	public render() {
		return (
			<div className="cards-container">
				{this.props.employees.map(((employee) =>
					<div className="card" key={employee.id}>
						<Employee 
							employee={employee}
							deleteClickHandler={(id: number) => this.props.deleteEmployee(id) }
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
		deleteEmployee
	}
)(ListEmployees);
