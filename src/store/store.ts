import { IAlertPayload } from './actions';
import { combineReducers, createStore, Store } from 'redux';
import { employees, IEmployees } from './reducers/employees';
import { maxSimultaneousCompetencies } from './reducers/maxCompetencies';
import { alert } from './reducers/alert';


export interface IState {
	employees: IEmployees;
	maxSimultaneousCompetencies: number;
	alert: IAlertPayload | null;
}

const app = combineReducers<IState>({
	employees,
	maxSimultaneousCompetencies,
	alert
});

export const store: Store = createStore(app);
