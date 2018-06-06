import { combineReducers, createStore, Store } from 'redux';
import { employees, IEmployees } from './reducers/employees';
import { maxSimultaneousCompetencies } from './reducers/maxCompetencies';


export interface IState {
	employees: IEmployees;
	maxSimultaneousCompetencies: number;
}

const app = combineReducers<IState>({
	employees,
	maxSimultaneousCompetencies
});

export const store: Store = createStore(app);
