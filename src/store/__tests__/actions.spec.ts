import { ISelectEmployee, updateMaxSimCompetencies, IUpdateMaxSimCompetencies } from './../actions';
import { IAddEmployee, addEmployee, ActionTypes, IUpdateEmployee, updateEmployee, addCompetence, IAddCompetence, IDeleteCompetence, deleteCompetence, selectEmployee } from "../actions";

describe('actions', () => {
	describe('addEmployee', () => {
		it('should create an add employee object', () => {
			const employee = {
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: [{
					id: 1,
					yearsExperience: 1,
					title: 'coding'
				}]
			};
			const addEmployeeAction: IAddEmployee = addEmployee(
				employee.name,
				employee.totalYearsExperience,
				employee.competencies
			);
			expect(addEmployeeAction).toEqual({
				type: ActionTypes.AddEmployee,
				payload: {
					name: employee.name,
					totalYearsExperience: employee.totalYearsExperience,
					competencies: employee.competencies
				}
			});
		});
	});

	describe('updateEmployee', () => {
		it('should create an update employee object', () => {
			const employee = {
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 5,
				competencies: [{
					id: 1,
					yearsExperience: 1,
					title: 'coding'
				}]
			};
			const updateEmployeeAction: IUpdateEmployee = updateEmployee(
				employee.id,
				employee.name,
				employee.totalYearsExperience,
				employee.competencies
			);
			expect(updateEmployeeAction).toEqual({
				type: ActionTypes.UpdateEmployee,
				payload: {
					id: employee.id,
					name: employee.name,
					totalYearsExperience: employee.totalYearsExperience,
					competencies: employee.competencies
				}
			});
		});
	});

	describe('selectEmployee', () => {
		it('should create an update employee object', () => {
			const employee = {
				id: 1
			};
			const selectEmployeeAction: ISelectEmployee = selectEmployee(
				employee.id
			);
			expect(selectEmployeeAction).toEqual({
				type: ActionTypes.SelectEmployee,
				payload: {
					id: employee.id
				}
			});
		});
	});

	describe('addCompetence', () => {
		it('should create an add competence object', () => {
			const competence = {
				userId: 1,
				title: 'coding',
				yearsExperience: 5
			};
			const addCompetenceAction: IAddCompetence = addCompetence(
				competence.userId,
				competence.title,
				competence.yearsExperience
			);
			expect(addCompetenceAction).toEqual({
				type: ActionTypes.AddCompetence,
				payload: {
					userId: competence.userId,
					title: competence.title,
					yearsExperience: competence.yearsExperience
				}
			});
		});
	});

	describe('deleteCompetence', () => {
		it('should create an delete competence object', () => {
			const competence = {
				userId: 1,
				id: 1
			};
			const deleteCompetenceAction: IDeleteCompetence = deleteCompetence(
				competence.userId,
				competence.id
			);
			expect(deleteCompetenceAction).toEqual({
				type: ActionTypes.DeleteCompetence,
				payload: {
					userId: competence.userId,
					id: competence.id
				}
			});
		});
	});

	describe('updateCompetence', () => {
		it('should create an update competence object', () => {
			const payload = {
				userId: 1,
				id: 1,
				yearsExperience: 4
			};
			const deleteCompetenceAction: IDeleteCompetence = deleteCompetence(
				payload.userId,
				payload.id
			);
			expect(deleteCompetenceAction).toEqual({
				type: ActionTypes.DeleteCompetence,
				payload: {
					userId: payload.userId,
					id: payload.id
				}
			});
		});
	});

	describe('updateMaxSimCompetencies', () => {
		it('should create an update max simultaneous object', () => {
			const payload = {
				value: 4
			};
			const updateMaxSimCompetenciesAction: IUpdateMaxSimCompetencies = updateMaxSimCompetencies(
				payload.value
			);
			expect(updateMaxSimCompetenciesAction).toEqual({
				type: ActionTypes.UpdateMaxSimCompetencies,
				payload
			});
		});
	});
});
