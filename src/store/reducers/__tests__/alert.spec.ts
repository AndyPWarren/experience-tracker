import { IAlertPayload, clearAlert } from './../../actions';
import { alert } from "../alert";
import { updateAlert } from "../../actions";

describe('dialogue reducer', () => {
	it('should return the dialogue object', () => {
		const oldState = null;
		const newDialogue: IAlertPayload = {
			messageContent: 'content',
			messageTitle: 'title',
			action: () => console.log
		};
		const newState = alert(oldState, updateAlert(newDialogue));
		expect(newState).toEqual(newDialogue);
	});

	it('should null the dialogue object', () => {
		const oldState: IAlertPayload = {
			messageContent: 'content',
			messageTitle: 'title',
			action: () => console.log
		};
		const newState = alert(oldState, clearAlert());
		expect(newState).toBeNull();
	});
});
