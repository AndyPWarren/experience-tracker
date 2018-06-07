import { combineReducers, createStore, Store } from 'redux';
import { employees, IEmployee } from './reducers/employees';
import { maxSimultaneousCompetencies } from './reducers/maxCompetencies';


export interface IState {
	employees: IEmployee[];
	maxSimultaneousCompetencies: number;
}

const app = combineReducers<IState>({
	employees,
	maxSimultaneousCompetencies
});

export const store: Store = createStore(app);
