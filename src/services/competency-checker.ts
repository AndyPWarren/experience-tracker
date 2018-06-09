import { ICompetence } from './../store/reducers/employees';

export function checkMaxSimultaneous(competencies: ICompetence[], total: number, max: number ): boolean {
	if (competencies.length === 0) {
		return false;
	} 
	const totalCompetencies = competencies
		.map((c) => c.yearsExperience)
		.reduce((a, b) => a + b);
	if (totalCompetencies > total * max) {
		return true;
	}
	return false;
}
