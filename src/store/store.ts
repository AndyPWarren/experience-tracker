import { combineReducers, createStore, Store } from 'redux';
import { employees, IEmployees } from './reducers/employees';


export interface IState {
	employees: IEmployees;
}

const app = combineReducers<IState>({
	employees
});

export const store: Store = createStore(app);
