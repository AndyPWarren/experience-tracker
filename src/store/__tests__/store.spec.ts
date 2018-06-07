import { store } from "../store";
import { addEmployee } from "../actions";

describe('store', () => {
	it('should set initial state', () => {
		const state = store.getState();
		expect(state).toEqual({
			employees: [],
			maxSimultaneousCompetencies: 3
		});
	});

	it('should create an employee', () => {
		store.dispatch(addEmployee('dave smith', 3, []));
		const state = store.getState();
		expect(state.employees).toEqual([{
			id: 1,
			name: 'dave smith',
			totalYearsExperience: 3,
			competencies: []
		}]);
	});
});
