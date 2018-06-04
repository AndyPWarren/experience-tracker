import { Action } from "./employees";
import { ActionTypes } from "../actions";

export interface ICompetence {
	id: number;
	title: string;
	yearsExperience: number;
}

export function competencyReducer(competencies: ICompetence[] = [], action: Action): ICompetence[] {
	switch (action.type) {
		case ActionTypes.AddCompetence:
			return [
				...competencies,
				{
					id: (competencies.length > 0) ? competencies[competencies.length - 1].id + 1 : 1,
					title: action.payload.title,
					yearsExperience: action.payload.yearsExperience
				}
			];
		case ActionTypes.DeleteCompetence:
			return competencies.filter((competence) => competence.id !== action.payload.id);
		case ActionTypes.UpdateCompetence:
			return competencies.map((competency) => {
				if (competency.id !== action.payload.id) {
					return competency;
				}
				return {
					...competency,
					yearsExperience: action.payload.yearsExperience
				};
			});
		default:
			return competencies;
	}
}
