import { store } from "../store";
import { addEmployee } from "../actions";

describe('store', () => {
	it('should create an employee', () => {
		store.dispatch(addEmployee('dave smith', 3));
		const state = store.getState();
		expect(state).toEqual({
			employees: [{
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 3,
				competencies: []
			}]
		});
	});
});
