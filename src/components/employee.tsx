import * as React from 'react';
import { IEmployee } from '../store/reducers/employees';

interface IProps {
	employee: IEmployee;
}

export default function Employee(props: IProps) {
	return (
		<span>
			{props.employee.name} {props.employee.totalYearsExperience}
		</span>
	);
}
