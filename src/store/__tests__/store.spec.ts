import { IAlertPayload } from './../actions';
import { store, IState } from "../store";
import { addEmployee, updateAlert } from "../actions";

describe('store', () => {
	it('should set initial state', () => {
		const state = store.getState();
		expect(state).toEqual({
			employees: [],
			maxSimultaneousCompetencies: 3,
			alert: null
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

	it('should update the alert', () => {
		const newDialogue: IAlertPayload = {
			messageTitle: 'title',
			messageContent: 'content',
			action: () => console.log
		};
		store.dispatch(updateAlert(newDialogue));
		const state: IState = store.getState();
		expect(state.alert).toEqual(newDialogue);
	});
});
