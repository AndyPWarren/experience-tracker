import { IAlertPayload } from './actions';
import { combineReducers, createStore, Store } from 'redux';
import { employees, IEmployee } from './reducers/employees';
import { maxSimultaneousCompetencies } from './reducers/maxCompetencies';
import { alert } from './reducers/alert';


export interface IState {
	employees: IEmployee[];
	maxSimultaneousCompetencies: number;
	alert: IAlertPayload | null;
}

const app = combineReducers<IState>({
	employees,
	maxSimultaneousCompetencies,
	alert
});

export const store: Store = createStore(app);
