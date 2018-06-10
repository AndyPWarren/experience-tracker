import { IEmployee } from './../../store/reducers/employees';
import { checkMaxSimultaneous, getPreviousCompetencies } from "../competency-helpers";
import { ICompetence } from "../../store/reducers/employees";

describe('competency helpers', () => {
	describe('checkMaxSimultaneous', () => {
		it('should return true if the sum of all competencies exceeds the permitted max', () => {
			const totalYears = 2;
			const competencies: ICompetence[] = [
				{title: 'A', yearsExperience: 2, id: 1},
				{title: 'B', yearsExperience: 2, id: 2},
				{title: 'C', yearsExperience: 2, id: 3},
				{title: 'D', yearsExperience: 1, id: 4},
			];
			const result = checkMaxSimultaneous(competencies, totalYears, 3);
			expect(result).toEqual(true);
		});

		it('should return false if the sum of all competencies is less than or equal to the permitted max', () => {
			const totalYears = 2;
			const competencies: ICompetence[] = [
				{title: 'A', yearsExperience: 2, id: 1},
				{title: 'B', yearsExperience: 2, id: 2},
				{title: 'C', yearsExperience: 2, id: 3}
			];
			const result = checkMaxSimultaneous(competencies, totalYears, 3);
			expect(result).toEqual(false);
		});

		it('should return false if there are no competencies', () => {
			const totalYears = 2;
			const competencies: ICompetence[] = [];
			const result = checkMaxSimultaneous(competencies, totalYears, 3);
			expect(result).toEqual(false);
		});

		it('should return false if there is one competency', () => {
			const totalYears = 2;
			const competencies: ICompetence[] = [
				{title: 'A', yearsExperience: 2, id: 1},
			];
			const result = checkMaxSimultaneous(competencies, totalYears, 3);
			expect(result).toEqual(false);
		});
	});

	describe('getPreviousCompetencies', () => {
		it('should return a list of all previous competencies', () => {
			const employees: IEmployee[] = [{
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 2,
				competencies: [
					{title: 'A', yearsExperience: 2, id: 1},
					{title: 'B', yearsExperience: 2, id: 2},
					{title: 'C', yearsExperience: 2, id: 3},
					{title: 'D', yearsExperience: 1, id: 4}
				]
			},{
				id: 2,
				name: 'bob',
				totalYearsExperience: 2,
				competencies: [
					{title: 'E', yearsExperience: 2, id: 1},
					{title: 'F', yearsExperience: 2, id: 2},
					{title: 'G', yearsExperience: 2, id: 3},
					{title: 'A', yearsExperience: 1, id: 4}
				]
			}];
			const result = getPreviousCompetencies(employees);
			expect(result).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
		});

		it('should return empty array if there are no competencies', () => {
			const employees: IEmployee[] = [{
				id: 1,
				name: 'dave smith',
				totalYearsExperience: 2,
				competencies: []
			},{
				id: 2,
				name: 'bob',
				totalYearsExperience: 2,
				competencies: []
			}];
			const result = getPreviousCompetencies(employees);
			expect(result).toEqual([]);
		});

		it('should return empty array if there are no employees', () => {
			const employees: IEmployee[] = [];
			const result = getPreviousCompetencies(employees);
			expect(result).toEqual([]);
		});
	});
});
