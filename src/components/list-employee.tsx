import * as React from 'react';
import { IEmployee } from '../store/reducers/employees';
import Employee from './employee';

interface IProps {
	employees: IEmployee[];
}

export default class ListEmployees extends React.Component<IProps> {
	public render() {
		return (
			<div className="cards-container">
				{this.props.employees.map(((employee) =>
					<div className="card" key={employee.id}>
						<Employee employee={employee} />
					</div>
				))}
			</div>
		);
	}
}
