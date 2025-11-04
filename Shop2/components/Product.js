import React from 'react';
import './Product.css'
class Product extends React.Component {
      handleClick = () => {
            const { product, onRowClick } = this.props;
            onRowClick(product.id);
        }
    render() {
      const {product, isSelected, onRowDelete} = this.props;

        return (
            <tr key = {product.id} className={isSelected ? 'selected' : ''} onClick = {this.handleClick}>
                <td><img src={product.imageURL} alt={product.name} /></td>
                <td>{product.name}</td>
                <td>{product.price} BYN</td>
                <td>{product.stock} шт.</td>
                <td>
                    <button onClick={(eo) =>{eo.stopPropagation(); onRowDelete(product.id)}} >Удалить</button>
                </td>
            </tr>
        )
    }
}

export default Product