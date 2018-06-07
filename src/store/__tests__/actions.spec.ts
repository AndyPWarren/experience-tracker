import { updateMaxSimCompetencies, IUpdateMaxSimCompetencies, IDeleteEmployee, deleteEmployee } from './../actions';
import { IAddEmployee, addEmployee, ActionTypes, IUpdateEmployee, updateEmployee } from "../actions";

describe('actions', () => {
	describe('addEmployee', () => {
		it('should create an add employee object', () => {
			const employee = {
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: [{
					id: 1,
					yearsExperience: 1,
					title: 'coding'
				}]
			};
			const addEmployeeAction: IAddEmployee = addEmployee(
				employee.name,
				employee.totalYearsExperience,
				employee.competencies
			);
			expect(addEmployeeAction).toEqual({
				type: ActionTypes.AddEmployee,
				payload: {
					name: employee.name,
					totalYearsExperience: employee.totalYearsExperience,
					competencies: employee.competencies
				}
			});
		});
	});

	describe('updateEmployee', () => {
		it('should create an update employee object', () => {
			const employee = {
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: [{
					id: 1,
					yearsExperience: 1,
					title: 'coding'
				}]
			};
			const updateEmployeeAction: IUpdateEmployee = updateEmployee(
				employee.id,
				employee.name,
				employee.totalYearsExperience,
				employee.competencies
			);
			expect(updateEmployeeAction).toEqual({
				type: ActionTypes.UpdateEmployee,
				payload: {
					id: employee.id,
					name: employee.name,
					totalYearsExperience: employee.totalYearsExperience,
					competencies: employee.competencies
				}
			});
		});
	});

	describe('deleteEmployee', () => {
		it('should create an delete employee object', () => {
			const deleteEmployeeAction: IDeleteEmployee  = deleteEmployee(1);
			expect(deleteEmployeeAction).toEqual({
				type: ActionTypes.DeleteEmployee,
				payload: {
					id: 1,
				}
			});
		});
	});

	describe('updateMaxSimCompetencies', () => {
		it('should create an update max simultaneous object', () => {
			const payload = {
				value: 4
			};
			const updateMaxSimCompetenciesAction: IUpdateMaxSimCompetencies = updateMaxSimCompetencies(
				payload.value
			);
			expect(updateMaxSimCompetenciesAction).toEqual({
				type: ActionTypes.UpdateMaxSimCompetencies,
				payload
			});
		});
	});
});
