import React from 'react';
import Product from './Product';

import './Shop.css';

class Shop extends React.Component {

  render()
  {
    const {name, address, products} = this.props; 
    return (
      <div className='Shop'>
        <h1 className='Shop_Name'>
          {name}
        </h1>
        <span className='Shop_Address'>
          {address}
        </span>
        <table className='Table'>
      <thead>
        <tr>
            <th>Фото</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Доступно на складе</th>
          </tr>
      </thead>
      <tbody>
         {products.map((product) => (
            <Product key={product.id} product={product} />
            
          ))}
      </tbody>
    </table>
      </div>
    );
  }

}

export default Shop;
