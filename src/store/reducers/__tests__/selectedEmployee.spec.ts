import * as deepFreeze from 'deep-freeze';
import { IEmployees, IEmployee } from '../employees';
import { selectedEmployeeReducer } from '../selectedEmployee';
import { selectEmployee } from '../../actions';

describe('selected employee reducer', () => {
	it('should return the selected employee', () => {
		const oldState: IEmployees = {
			allEmployees: [
				{
					id: 1,
					name: 'dave smith',
					totalYearsExperience: 1,
					competencies: []
				}
			],
			selected: null
		};
		deepFreeze(oldState);
		const newState = selectedEmployeeReducer(oldState, selectEmployee(1));
		const expectedState: IEmployee = oldState.allEmployees[0];
		expect(newState).toEqual(expectedState);
	});
});
