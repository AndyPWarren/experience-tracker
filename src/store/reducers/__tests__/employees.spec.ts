import * as deepFreeze from 'deep-freeze';
import {
	IEmployee
} from '../employees';
import { addEmployee, updateEmployee, deleteEmployee } from '../../actions';
import { employees } from '../employees';

describe('employee reducer', () => {
	describe('add employee reducer', () => {
		it('should add the employee to the state, not mutating it', () => {
			const oldState: IEmployee[] = [{
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: []
			}];
			const expectedEmployee: IEmployee = {
				id: 2,
				name: 'barbra',
				totalYearsExperience: 3,
				competencies: []
			};
			deepFreeze(oldState);
			const newState = employees(oldState, addEmployee('barbra', 3, []));
			expect(newState).toEqual([...oldState, expectedEmployee]);
		});

		it('should set the id to 1 when if there are no issues', () => {
			const expectedEmployee: IEmployee = {
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: []
			};
			const newState = employees([], addEmployee('dave smith', 5, []));
			expect(newState).toEqual([expectedEmployee]);
		});
	});

	describe('update employee', () => {
		it('should update the employee', () => {
			const oldState: IEmployee[] = [{
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: []
			}, {
				id: 2,
				name: 'barbra',
				totalYearsExperience: 3,
				competencies: []
			}];

			const expectedEmployee: IEmployee = {
				id: 2,
				name: 'barbra green',
				totalYearsExperience: 5,
				competencies: [{
					id: 1,
					title: 'coding',
					yearsExperience: 1
				}]
			};
			deepFreeze(oldState);
			const newState = employees(oldState, updateEmployee(2, 'barbra green', 5, expectedEmployee.competencies));
			expect(newState).toEqual([oldState[0], expectedEmployee]);
		});
	});

	describe('delete employee', () => {
		it('should delete the employee', () => {
			const oldState: IEmployee[] = [{
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: []
			}, {
				id: 2,
				name: 'barbra',
				totalYearsExperience: 3,
				competencies: []
			}];

			const expectedState: IEmployee[] = [
				oldState[1]
			];
			deepFreeze(oldState);
			const newState = employees(oldState, deleteEmployee(1);
			expect(newState).toEqual(expectedState);
		});
	});
});
