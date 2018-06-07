import { ActionTypes, IAlertPayload, IAlertDialogue, IClearDialogue } from './../actions';

type Actions = 
	IAlertDialogue |
	IClearDialogue;

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
