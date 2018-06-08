import { ActionTypes, IUpdateMaxSimCompetencies } from './../actions';
/**
 * max simultaneous competencies reducer
 * @param state previous max simultaneous competencies number
 * @param action action to perform on the state
 */
export function maxSimultaneousCompetencies(state: number = 3, action: IUpdateMaxSimCompetencies ): number {
	switch (action.type) {
		case ActionTypes.UpdateMaxSimCompetencies:
			return action.payload.value;
		default:
			return state;
	}
}
