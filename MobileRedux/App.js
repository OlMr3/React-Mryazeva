import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import MobileCompany from './components/MobileCompany';



ReactDOM.render(
  <Provider store={store}>
    <MobileCompany />
  </Provider>
  , document.getElementById('container') 
);

