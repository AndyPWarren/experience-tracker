import { ISelectEmployee } from './../actions';
import { ActionTypes, IAddEmployee, IUpdateEmployee, IAddCompetence, IDeleteCompetence, IUpdateCompetence } from "../actions";
import { ICompetence } from "./competencies";
import { selectedEmployeeReducer } from './selectedEmployee';
import { allEmployeesReducer } from './allEmployees';



export interface IEmployee {
	id: number;
	name: string;
	totalYearsExperience: number;
	competencies: ICompetence[];
}

export interface IEmployees {
	allEmployees: IEmployee[];
	selected: IEmployee | null;
}

export type Action =
	| IAddEmployee
	| IUpdateEmployee
	| IAddCompetence
	| IDeleteCompetence
	| IUpdateCompetence
	| ISelectEmployee;

const initialState: IEmployees = {
	allEmployees: [],
	selected: null
};

export function employees(state: IEmployees = initialState, action: Action): IEmployees {
	switch (action.type) {
		case ActionTypes.SelectEmployee:
			return {
				...state,
				selected: selectedEmployeeReducer(state, action)
			};
		default:
			return {
				...state,
				allEmployees: allEmployeesReducer(state.allEmployees, action)
			};
	}
}
