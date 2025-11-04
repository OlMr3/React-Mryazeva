import React from 'react';
import Product from './Product';

import './Shop.css';

class Shop extends React.Component {

  state = {
    selectedProductId: null,
    products: this.props.products,
  };
   handleRowClick = (productId)=>{
    this.setState({selectedProductId: productId});
   };
   deleteRowClick = (productId) => {
   if (window.confirm("Вы действительно хотите удалить этот товар?")){
    this.setState((prevState) =>{
      const updateProducts = prevState.products.filter(product => product.id !== productId);
    
      return {
        products: updateProducts
      };
    })    
   }
   };


  render()
  {
    const {name, address} = this.props; 
    const {selectedProductId, products} = this.state;
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
            <Product 
            key={product.id} 
            product={product}
            isSelected={selectedProductId === product.id}
            onRowClick={this.handleRowClick}
            onRowDelete={this.deleteRowClick} />
            
          ))}
      </tbody>
    </table>
      </div>
    );
  }

}

export default Shop;
