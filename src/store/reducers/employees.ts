import { ActionTypes, IAddEmployee, IUpdateEmployee } from "../actions";

export interface ICompetence {
	id: number;
	title: string;
	yearsExperience: number;
}

export interface IEmployee {
	id: number;
	name: string;
	totalYearsExperience: number;
	competencies: ICompetence[];
}

export type Action =
	| IAddEmployee
	| IUpdateEmployee;

export function employees(state: IEmployee[] = [], action: Action): IEmployee[] {
	switch (action.type) {
		case ActionTypes.AddEmployee:
			return [...state, {
				id: (state.length > 0) ? state[state.length - 1].id + 1 : 1,
				name: action.payload.name,
				totalYearsExperience: action.payload.totalYearsExperience,
				competencies: [...action.payload.competencies]
			}];
		case ActionTypes.UpdateEmployee:
			return state.map((employee) => {
				if (employee.id !== action.payload.id) {
					return employee;
				}

				return {
					...employee,
					name: action.payload.name,
					totalYearsExperience: action.payload.totalYearsExperience,
					competencies: [...action.payload.competencies]
				};
			});
		default:
			return state;
	}
}
