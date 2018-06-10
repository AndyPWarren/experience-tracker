import { ICompetence, IEmployee } from './../store/reducers/employees';

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

export function getPreviousCompetencies(employees: IEmployee[]): string[] {
	if (employees.length === 0) {
		return [];
	}
	return employees
		.map((employee) => {
			return employee.competencies.map((c) => c.title);
		})
		.reduce((a, b) => [...a, ...b])
		.sort()
		.filter((item, i, arr) => {
			return !i || item !== arr[i - 1];
		});
}
