import * as React from 'react';
import { IEmployee } from '../store/reducers/employees';
import Employee from './employee';

interface IProps {
	employees: IEmployee[];
	onClick: (id: number) => void;
}

export default class ListEmployees extends React.Component<IProps> {
	public render() {
		return (
			<ul>
				{this.props.employees.map(((employee) =>
					<li key={employee.id} onClick={() => this.props.onClick(employee.id)}>
						<Employee employee={employee} />
					</li>
				))}
			</ul>
		);
	}
}
