import { ICompetence } from "./reducers/competencies";

export enum ActionTypes {
	AddEmployee = "ADD_EMPLOYEE",
	UpdateEmployee = "UPDATE_EMPLOYEE",
	SelectEmployee = "SELECT_EMPLOYEE",
	AddCompetence = "ADD_COMPETENCE",
	DeleteCompetence = "DELETE_COMPETENCE",
	UpdateCompetence = "UPDATE_COMPETENCE",
	UpdateMaxSimCompetencies = "UPDATE_MAX_SIMULTANEOUS_COMPETENCIES",
}

export interface IAddEmployee {
	type: ActionTypes.AddEmployee;
	payload: {
		name: string,
		totalYearsExperience: number,
		competencies: ICompetence[]
	};
}

export function addEmployee(
	name: string,
	totalYearsExperience: number,
	competencies: ICompetence[]): IAddEmployee {
	return {
		type: ActionTypes.AddEmployee,
		payload: { 
			name, 
			totalYearsExperience,
			competencies
		}
	};
}

export interface IUpdateEmployee {
	type: ActionTypes.UpdateEmployee;
	payload: {
		id: number,
		name: string,
		totalYearsExperience: number,
	};
}

export function updateEmployee(id: number, name: string, totalYearsExperience: number): IUpdateEmployee {
	return {
		type: ActionTypes.UpdateEmployee,
		payload: { 
			id,
			name,
			totalYearsExperience
		}
	};
}

export interface ISelectEmployee {
	type: ActionTypes.SelectEmployee;
	payload: {
		id: number
	};
}

export function selectEmployee(id: number): ISelectEmployee {
	return {
		type: ActionTypes.SelectEmployee,
		payload: { 
			id
		}
	};
}


export interface IAddCompetence {
	type: ActionTypes.AddCompetence;
	payload: {
		userId: number,
		title: string,
		yearsExperience: number,
	};
}

export function addCompetence(userId: number, title: string, yearsExperience: number): IAddCompetence {
	return {
		type: ActionTypes.AddCompetence,
		payload: { 
			userId,
			title,
			yearsExperience
		}
	};
}

export interface IDeleteCompetence {
	type: ActionTypes.DeleteCompetence;
	payload: {
		userId: number,
		id: number
	};
}

export function deleteCompetence(userId: number, id: number): IDeleteCompetence {
	return {
		type: ActionTypes.DeleteCompetence,
		payload: { 
			userId,
			id
		}
	};
}

export interface IUpdateCompetence {
	type: ActionTypes.UpdateCompetence;
	payload: {
		userId: number,
		id: number,
		yearsExperience: number
	};
}

export function updateCompetence(userId: number, id: number, yearsExperience: number): IUpdateCompetence {
	return {
		type: ActionTypes.UpdateCompetence,
		payload: { 
			userId,
			id,
			yearsExperience
		}
	};
}

export interface IUpdateMaxSimCompetencies {
	type: ActionTypes.UpdateMaxSimCompetencies;
	payload: {
		value: number
	};
}

export function updateMaxSimCompetencies(value: number): IUpdateMaxSimCompetencies {
	return {
		type: ActionTypes.UpdateMaxSimCompetencies,
		payload: { 
			value
		}
	};
}
