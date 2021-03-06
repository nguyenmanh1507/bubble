import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';

import './firebase';
import App from './App';
import * as serviceWorker from './serviceWorker';

import SampleStore from './stores/SampleStore';
import ModalStore from './stores/ModalStore';
import TransactionStore from './stores/TransactionStore';

configure({
  enforceActions: 'always'
});

const stores = { SampleStore, ModalStore, TransactionStore };

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
