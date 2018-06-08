import { ActionTypes, IAlertPayload, IAlert, IClearDialogue } from './../actions';

type Actions = 
	IAlert |
	IClearDialogue;

/**
 * alert reducer
 * @param state previous alert 
 * @param action action to perform on the state
 */
export function alert(state: IAlertPayload | null = null, action: Actions ): IAlertPayload | null {
	switch (action.type) {
		case ActionTypes.UpdateAlert:
			return action.payload;

		case ActionTypes.ClearAlert:
			return null;

		default:
			return state;
	}
}
