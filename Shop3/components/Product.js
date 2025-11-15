import React from 'react';
import './Product.css'
class Product extends React.Component {
    handleClick = () => {
        const { product, onRowClick, isEditing, isAddingNew } = this.props;
        if (isEditing || isAddingNew) return;
        onRowClick(product.id);

    }
    render() {
        const { product, isSelected, onRowDelete, onEdit, isEditing, isAddingNew } = this.props;

        return (
            <tr key={product.id} className={isSelected ? 'selected' : ''} onClick={this.handleClick}>
                <td><img src={product.imageURL} alt={product.name} /></td>
                <td>{product.name}</td>
                <td>{product.price} BYN</td>
                <td>{product.stock} шт.</td>
                <td>
                    <button disabled={isEditing || isAddingNew} onClick={(eo) => { eo.stopPropagation(); if (!isEditing && !isAddingNew) onEdit(product.id); }}>Редактировать</button>
                </td>
                <td>
                    <button disabled={isEditing || isAddingNew} onClick={(eo) => { eo.stopPropagation(); if (!isEditing && !isAddingNew) onRowDelete(product.id) }} >Удалить</button>
                </td>
            </tr>
        )
    }
}

export default Product;