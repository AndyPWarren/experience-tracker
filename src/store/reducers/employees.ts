import { ActionTypes, IAddEmployee, IUpdateEmployee, IDeleteEmployee } from "../actions";

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

export interface IEmployees {
	history: IEmployee[];
	current: IEmployee[];
}

const initialState: IEmployees = {
	history: [],
	current: []
};

export type Action =
	| IAddEmployee
	| IUpdateEmployee
	| IDeleteEmployee;
/**
 * employees reducer
 * @param state array of pervious employee
 * @param action action to perform on the state
 */
export function employees(state: IEmployees = initialState, action: Action): IEmployees {
	switch (action.type) {
		case ActionTypes.AddEmployee:
			const newEmployee: IEmployee = {
				id: (state.current.length > 0) ? state.current[state.current.length - 1].id + 1 : 1,
				name: action.payload.name,
				totalYearsExperience: action.payload.totalYearsExperience,
				competencies: [...action.payload.competencies]
			};
			return {
				...state,
				current: [
					...state.current,
					newEmployee
				],
				history: [
					...state.history,
					newEmployee
				]
			};
		case ActionTypes.UpdateEmployee:
			const updated = state.current.map((employee) => {
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
			return {
				...state,
				current: updated,
				history: [
					...state.history,
					...updated.filter(e => e.id === action.payload.id)
				]
			};
		case ActionTypes.DeleteEmployee:
			const deleted = state.current.filter((employee) => employee.id !== action.payload.id);
			return {
				...state,
				current: deleted
			};
		default:
			return state;
	}
}
