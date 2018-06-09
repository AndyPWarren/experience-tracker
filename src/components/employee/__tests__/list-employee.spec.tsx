import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { PureListEmployees } from "../list-employee";
import { IEmployee } from "../../../store/reducers/employees";

const employeesList: IEmployee[] = [{
	id: 1,
	name: 'dave',
	totalYearsExperience: 2,
	competencies: [
		{id: 1, title: 'html', yearsExperience: 1},
		{id: 1, title: 'css', yearsExperience: 1},
		{id: 1, title: 'go', yearsExperience: 1},
	]
}, {
	id: 2,
	name: 'bob',
	totalYearsExperience: 2,
	competencies: [
		{id: 1, title: 'js', yearsExperience: 1},
		{id: 1, title: 'python', yearsExperience: 1},
	]
}, {
	id: 3,
	name: 'daniel',
	totalYearsExperience: 2,
	competencies: [
		{id: 1, title: 'html', yearsExperience: 1}
	]
}];

describe('List employee', () => {
	let component: ShallowWrapper;
	beforeEach(() => {
		component = shallow(
			<PureListEmployees
				employees={employeesList}
				maxSimultaneousCompetencies={3}
				deleteEmployee={jest.fn()}
				updateAlert={jest.fn()}
			/>
	);
	});
	it('should filter the employees by name', () => {
		let employees = component.find('WithStyles(EmployeeCard)');
		expect(employees.first().prop('employee')).toEqual(employeesList[0]);
		
		// search for b
		component.setState({ search: 'b' });
		employees = component.find('WithStyles(EmployeeCard)');
		expect(employees.first().prop('employee')).toEqual(employeesList[1]);

		// search for d
		component.setState({ search: 'd' });
		employees = component.find('WithStyles(EmployeeCard)');
		expect(employees.length).toEqual(2);
		expect(employees.at(0).prop('employee')).toEqual(employeesList[0]);
		expect(employees.at(1).prop('employee')).toEqual(employeesList[2]);
	});

	it('should filter the employees by competencies', () => {
		let employees = component.find('WithStyles(EmployeeCard)');
		expect(employees.first().prop('employee')).toEqual(employeesList[0]);
		
		component.setState({ search: 'js' });
		employees = component.find('WithStyles(EmployeeCard)');
		expect(employees.first().prop('employee')).toEqual(employeesList[1]);

		component.setState({ search: 'html' });
		employees = component.find('WithStyles(EmployeeCard)');
		expect(employees.length).toEqual(2);
		expect(employees.at(0).prop('employee')).toEqual(employeesList[0]);
		expect(employees.at(1).prop('employee')).toEqual(employeesList[2]);
	});

	it('should filter match lower case when search is upper case', () => {
		let employees = component.find('WithStyles(EmployeeCard)');
		expect(employees.first().prop('employee')).toEqual(employeesList[0]);
		
		component.setState({ search: 'B' });
		employees = component.find('WithStyles(EmployeeCard)');
		expect(employees.length).toEqual(1);
		expect(employees.first().prop('employee')).toEqual(employeesList[1]);
	});
});
