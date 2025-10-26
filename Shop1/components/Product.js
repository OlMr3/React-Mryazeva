import React from 'react';
import './Product.css'
class Product extends React.Component {
    render(){
        const {product} = this.props;

        return(
            <tr key = {product.id}>
            <td><img src = {product.imageURL} alt = {product.name}/></td>
            <td>{product.name}</td>
            <td>{product.price} BYN</td>
            <td>{product.stock} шт.</td>
            </tr>
        )
    }
}

export default Product