import { ActionTypes, IAddEmployee, IUpdateEmployee, IAddCompetence, IDeleteCompetence, IUpdateCompetence } from "../actions";
import { ICompetence, competencyReducer } from "./competencies";



export interface IEmployee {
	id: number;
	name: string;
	totalYearsExperience: number;
	competencies: ICompetence[];
}

export type Action =
	| IAddEmployee
	| IUpdateEmployee
	| IAddCompetence
	| IDeleteCompetence
	| IUpdateCompetence;

export function employeesReducer(employees: IEmployee[] = [], action: Action): IEmployee[] {
	switch (action.type) {
		case ActionTypes.AddEmployee:
			return [...employees, {
				id: (employees.length > 0) ? employees[employees.length - 1].id + 1 : 1,
				name: action.payload.name,
				totalYearsExperience: action.payload.totalYearsExperience,
				competencies: []
			}];
		case ActionTypes.UpdateEmployee:
			return employees.map((employee) => {
				if (employee.id !== action.payload.id) {
					return employee;
				}

				return {
					...employee,
					name: action.payload.name,
					totalYearsExperience: action.payload.totalYearsExperience
				};
			});
		case ActionTypes.AddCompetence: 
			return employees.map((employee) => {
				if (employee.id !== action.payload.userId) {
					return employee;
				}
				
				return {
					...employee,
					competencies: competencyReducer(employee.competencies, action)
				};
			});
		case ActionTypes.DeleteCompetence: 
			return employees.map((employee) => {
				if (employee.id !== action.payload.userId) {
					return employee;
				}
				
				return {
					...employee,
					competencies: competencyReducer(employee.competencies, action)
				};
			});
		case ActionTypes.UpdateCompetence:
			return employees.map((employee) => {
				if (employee.id !== action.payload.userId) {
					return employee;
				}
				
				return {
					...employee,
					competencies: competencyReducer(employee.competencies, action)
				};
			});
		default:
			return employees;
	}
}
