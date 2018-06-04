export enum ActionTypes {
	AddEmployee = "ADD_EMPLOYEE",
	UpdateEmployee = "UPDATE_EMPLOYEE",
	AddCompetence = "ADD_COMPETENCE",
	DeleteCompetence = "DELETE_COMPETENCE",
	UpdateCompetence = "UPDATE_COMPETENCE",
}

export interface IAddEmployee {
	type: ActionTypes.AddEmployee;
	payload: {
		name: string,
		totalYearsExperience: number
	};
}

export function addEmployee(name: string, totalYearsExperience: number): IAddEmployee {
	return {
		type: ActionTypes.AddEmployee,
		payload: { 
			name, 
			totalYearsExperience
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
