import { ActionTypes, IUpdateMaxSimCompetencies } from './../actions';

export function maxSimultaneousCompetencies(state: number = 3, action: IUpdateMaxSimCompetencies ): number {
	switch (action.type) {
		case ActionTypes.UpdateMaxSimCompetencies:
			return action.payload.value;
		default:
			return state;
	}
}
