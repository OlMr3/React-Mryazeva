import React from 'react';
import ReactDOM from 'react-dom';

import Shop from './components/Shop';
import products from './products.json'

ReactDOM.render(
  <Shop name="Название интернет-магазина" address="Адрес интернет-магазина" products={products} />,
  document.getElementById('container') 
);
