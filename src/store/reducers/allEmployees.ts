import { IEmployee, Action } from "./employees";
import { ActionTypes } from "../actions";
import { competencyReducer } from "./competencies";

export function allEmployeesReducer(allEmployees: IEmployee[] = [], action: Action): IEmployee[] {
	switch (action.type) {
		case ActionTypes.AddEmployee:
			return [...allEmployees, {
				id: (allEmployees.length > 0) ? allEmployees[allEmployees.length - 1].id + 1 : 1,
				name: action.payload.name,
				totalYearsExperience: action.payload.totalYearsExperience,
				competencies: []
			}];
		case ActionTypes.UpdateEmployee:
			return allEmployees.map((employee) => {
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
			return allEmployees.map((employee) => {
				if (employee.id !== action.payload.userId) {
					return employee;
				}
				
				return {
					...employee,
					competencies: competencyReducer(employee.competencies, action)
				};
			});
		case ActionTypes.DeleteCompetence: 
			return allEmployees.map((employee) => {
				if (employee.id !== action.payload.userId) {
					return employee;
				}
				
				return {
					...employee,
					competencies: competencyReducer(employee.competencies, action)
				};
			});
		case ActionTypes.UpdateCompetence:
			return allEmployees.map((employee) => {
				if (employee.id !== action.payload.userId) {
					return employee;
				}
				
				return {
					...employee,
					competencies: competencyReducer(employee.competencies, action)
				};
			});
		default:
			return allEmployees;
	}
}
