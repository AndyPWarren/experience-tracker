import { maxSimultaneousCompetencies } from "../maxCompetencies";
import { updateMaxSimCompetencies } from "../../actions";

describe('max simultaneous competencies reducer', () => {
	it('should return the max simultaneous competencies', () => {
		const oldState: number = 3;
		const newState = maxSimultaneousCompetencies(oldState, updateMaxSimCompetencies(4));
		expect(newState).toEqual(4);
	});
});
