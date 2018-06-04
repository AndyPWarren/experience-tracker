import { combineReducers, createStore, Store } from 'redux';
import { IEmployee, employeesReducer } from './reducers/employees';


export interface IState {
	employees: ReadonlyArray<IEmployee>;
}

const app =  combineReducers<IState>({
	employees: employeesReducer,
});

export const store: Store = createStore(app);
