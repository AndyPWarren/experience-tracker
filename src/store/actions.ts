import { ICompetence } from "./reducers/employees";

export enum ActionTypes {
	AddEmployee = "ADD_EMPLOYEE",
	UpdateEmployee = "UPDATE_EMPLOYEE",
	SelectEmployee = "SELECT_EMPLOYEE",
	DeleteEmployee = "DELETE_EMPLOYEE",
	UpdateMaxSimCompetencies = "UPDATE_MAX_SIMULTANEOUS_COMPETENCIES",
	UpdateAlert = "UPDATE_ALERT",
	ClearAlert = "CLEAR_ALERT",
}

export interface IAddEmployee {
	type: ActionTypes.AddEmployee;
	payload: {
		name: string,
		totalYearsExperience: number,
		competencies: ICompetence[]
	};
}
/**
 * create an add employee action
 * @param name 
 * @param totalYearsExperience 
 * @param competencies 
 */
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
		competencies: ICompetence[]
	};
}
/**
 * create an update employee action
 * @param id id of the employee to update
 * @param name employees name
 * @param totalYearsExperience years of experience
 * @param competencies array of their competencies
 */
export function updateEmployee(
	id: number,
	name: string,
	totalYearsExperience: number,
	competencies: ICompetence[]): IUpdateEmployee {
	return {
		type: ActionTypes.UpdateEmployee,
		payload: { 
			id,
			name,
			totalYearsExperience,
			competencies
		}
	};
}

export interface IDeleteEmployee {
	type: ActionTypes.DeleteEmployee;
	payload: {
		id: number
	};
}
/**
 * create a delete employee action
 * @param id id of the employee for deletion
 */
export function deleteEmployee(id: number): IDeleteEmployee {
	return {
		type: ActionTypes.DeleteEmployee,
		payload: { 
			id
		}
	};
}

export interface IUpdateMaxSimCompetencies {
	type: ActionTypes.UpdateMaxSimCompetencies;
	payload: {
		value: number
	};
}
/**
 * create an update max simultaneous competencies object
 * @param value number to set
 */
export function updateMaxSimCompetencies(value: number): IUpdateMaxSimCompetencies {
	return {
		type: ActionTypes.UpdateMaxSimCompetencies,
		payload: { 
			value
		}
	};
}

export interface IAlertPayload {
	messageTitle: string;
	messageContent: string;
	action: () => void;
}

export interface IAlert {
	type: ActionTypes.UpdateAlert;
	payload: IAlertPayload;
}
/**
 * create an update alert action
 * @param payload alert data
 */
export function updateAlert(payload: IAlertPayload): IAlert {
	return {
		type: ActionTypes.UpdateAlert,
		payload
	};
}

export interface IClearDialogue {
	type: ActionTypes.ClearAlert;
}
/**
 * create a delete alert action
 */
export function clearAlert(): IClearDialogue {
	return {
		type: ActionTypes.ClearAlert
	};
}
