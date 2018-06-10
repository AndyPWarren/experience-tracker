import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { CssBaseline } from '@material-ui/core';

import { ICompetence } from './store/reducers/employees';
import { addEmployee } from './store/actions';

const competencies: ICompetence[] = [
  { id: 1, title: 'HTML', yearsExperience: 2 },
  { id: 2, title: 'CSS', yearsExperience: 2 },
  { id: 3, title: 'GO', yearsExperience: 2 },
];

const competencies2: ICompetence[] = [
  { id: 1, title: 'JS', yearsExperience: 2 },
  { id: 2, title: 'GO', yearsExperience: 1 },
];

store.dispatch(addEmployee('Andy', 2, competencies));
store.dispatch(addEmployee('Dave', 2, competencies2));

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <CssBaseline />
        <App />
    </React.Fragment>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
