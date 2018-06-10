import { IEmployee } from "../store/reducers/employees";

export interface INameChange {
	old: string;
	new: string;
}

export interface IChangesId {
	id: number;
	nameChanges: INameChange[];
}
/**
 * returns all the employee name changes for all the employees in a given array
 *
 * @export
 * @param {IEmployee[]} employees
 * @returns {IChangesId[]}
 */
export function getNameChanges(employees: IEmployee[]): IChangesId[] {
	const ids = employees
		.map(e => {
			return {
				id: e.id,
				changes: []
			};
		})
		.sort((a, b) => a.id > b.id ? a.id < b.id ? -1 : 1 : 0)
		.filter((item, i, arr) => {
			return !i || item.id !== arr[i - 1].id;
		});
	const groupByIds = ids.map(id => {
		return {
			id: id.id,
			changes: employees.filter(e => e.id === id.id).map(e => e.name)
		};
	});
	return groupByIds.map(group => {
		return {
			id: group.id,
			nameChanges: group.changes.map((name, i, self) => {
				return {
					old: self[i - 1],
					new: name
				};
			}).filter((h) => h.new !== h.old)
		};
	}).filter(id => id.nameChanges.length > 0);
}
