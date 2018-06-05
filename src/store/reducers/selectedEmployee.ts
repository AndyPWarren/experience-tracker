import { ISelectEmployee, ActionTypes } from './../actions';
import { IEmployees, IEmployee } from './employees';

export function selectedEmployeeReducer(state: IEmployees, action: ISelectEmployee ): IEmployee | null {
	switch (action.type) {
		case ActionTypes.SelectEmployee:
			return state.allEmployees.filter((employee) => employee.id === action.payload.id)[0];
		default:
			return null;
	}
}
