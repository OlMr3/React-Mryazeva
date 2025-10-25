import React from 'react';

import './Shop.css';

class Shop extends React.Component {

  render() {
    return (
      <div className='Shop'>
        <h1 className='Shop_Name'>
          {this.props.name}
        </h1>
        <span className='Shop_Address'>
          {this.props.address}
        </span>
      </div>
    );
  }

}

export default Shop;
