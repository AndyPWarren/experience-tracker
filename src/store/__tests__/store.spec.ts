import { IState } from './../store';
import { store } from "../store";
import { addEmployee, selectEmployee } from "../actions";

describe('store', () => {
	it('should set initial state', () => {
		const state = store.getState();
		expect(state).toEqual({
			employees: {
				allEmployees: [],
				selected: null
			}
		});
	});

	it('should create an employee', () => {
		store.dispatch(addEmployee('dave smith', 3));
		const state = store.getState();
		expect(state.employees.allEmployees).toEqual([{
			id: 1,
			name: 'dave smith',
			totalYearsExperience: 3,
			competencies: []
		}]);
	});

	it('should select an employee', () => {
		store.dispatch(addEmployee('dave smith', 3));
		store.dispatch(addEmployee('barbra', 1));
		store.dispatch(selectEmployee(1));
		const state: IState = store.getState();
		expect(state.employees.selected).toEqual({
			id: 1,
			name: 'dave smith',
			totalYearsExperience: 3,
			competencies: []
		});
	});
});
