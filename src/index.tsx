import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { CssBaseline } from '@material-ui/core';

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
