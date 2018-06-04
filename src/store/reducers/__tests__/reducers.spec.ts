import * as deepFreeze from 'deep-freeze';
import {
	IEmployee, employeesReducer
} from '../employees';
import { addEmployee, updateEmployee, addCompetence, deleteCompetence, updateCompetence } from '../../actions';

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
			const newState = employeesReducer(oldState, addEmployee('barbra', 3));
			expect(newState).toEqual([...oldState, expectedEmployee]);
		});

		it('should set the id to 1 when if there are no issues', () => {
			const expectedEmployee: IEmployee = {
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: []
			};
			const newState = employeesReducer([], addEmployee('dave smith', 5));
			expect(newState).toEqual([expectedEmployee]);
		});

		it('should set the blank state if no state exists', () => {
			const newState = employeesReducer([], updateEmployee(1, 'fake', 1));
			expect(newState).toEqual([]);
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
				competencies: []
			};
			deepFreeze(oldState);
			const newState = employeesReducer(oldState, updateEmployee(2, 'barbra green', 5));
			expect(newState).toEqual([oldState[0], expectedEmployee]);
		});
	});

	describe('add competence', () => {
		it('should add the competence to the user', () => {
			const oldState: IEmployee[] = [{
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: []
			}];

			const expectedEmployee: IEmployee = {
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: [{
					id: 1,
					title: 'coding',
					yearsExperience: 1
				}]
			};
			deepFreeze(oldState);
			const newState = employeesReducer(oldState, addCompetence(1, 'coding', 1));
			expect(newState).toEqual([expectedEmployee]);
		});
		
		it('should set the id to 1 when if there are no employees', () => {
			const expectedEmployee: IEmployee = {
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: []
			};
			const newState = employeesReducer([], addEmployee('dave smith', 5));
			expect(newState).toEqual([expectedEmployee]);
		});
	});

	describe('delete competence', () => {
		it('should delete the competence from the given user', () => {
			const oldState: IEmployee[] = [{
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: [{
					id: 1,
					title: 'coding',
					yearsExperience: 1
				}]
			}];

			const expectedEmployee: IEmployee = {
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: []
			};
			deepFreeze(oldState);
			const newState = employeesReducer(oldState, deleteCompetence(1, 1));
			expect(newState).toEqual([expectedEmployee]);
		});
	});

	describe('update competence', () => {
		it('should update the competency from the given user', () => {
			const oldState: IEmployee[] = [{
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: [{
					id: 1,
					title: 'coding',
					yearsExperience: 1
				},{
					id: 2,
					title: 'coding',
					yearsExperience: 4
				}]
			}];

			const expectedEmployee: IEmployee = {
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: [{
					id: 1,
					title: 'coding',
					yearsExperience: 2
				},{
					id: 2,
					title: 'coding',
					yearsExperience: 4
				}]
			};
			deepFreeze(oldState);
			const newState = employeesReducer(oldState, updateCompetence(1, 1, 2));
			expect(newState).toEqual([expectedEmployee]);
		});
	});
});
