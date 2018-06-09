import { checkMaxSimultaneous } from "../competency-checker";
import { ICompetence } from "../../store/reducers/employees";

describe('competency checker', () => {
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
});
