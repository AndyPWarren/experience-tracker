import { IEmployee } from "../../store/reducers/employees";
import { getNameChanges } from "../history";

describe('getNameChanges', () => {
	let employees: IEmployee[];
	beforeEach(() => {
		employees = [
			{id: 1, name: 'Roy', totalYearsExperience: 2, competencies: []},
			{id: 2, name: 'Maurice', totalYearsExperience: 2, competencies: []},
			{id: 3, name: 'Jen', totalYearsExperience: 2, competencies: []},
			{id: 1, name: 'Roy Trenneman', totalYearsExperience: 2, competencies: []},
			{id: 2, name: 'Maurice Moss', totalYearsExperience: 2, competencies: []},
			{id: 3, name: 'Jen Barber', totalYearsExperience: 2, competencies: []},
			{id: 1, name: 'Cathy Morganforman', totalYearsExperience: 2, competencies: []},
		];
	});
	it('should return array of name change objects for each id', () => {
		const result = getNameChanges(employees);
		expect(result).toEqual(
			[ 
				{
					id: 1,
					nameChanges: [
						{ old: undefined, new: 'Roy' },
						{ old: 'Roy', new: 'Roy Trenneman' },
						{ old: 'Roy Trenneman', new: 'Cathy Morganforman' }
					]
				}, {
					id: 2,
					nameChanges: [
						{ old: undefined, new: 'Maurice' },
						{ old: 'Maurice', new: 'Maurice Moss' }
					]
				}, {
					id: 3,
					nameChanges: [
						{ old: undefined, new: 'Jen' },
						{ old: 'Jen', new: 'Jen Barber' }
					]
				}
			]
		);
	});

	it('should return an empty array if there are no changes', () => {
		employees = [];
		const result = getNameChanges(employees);
		expect(result).toEqual([]);
	});
});
