import React from "react";
import './ProductDetails.css'

class ProductDetails extends React.Component {
    render() {
        const { product } = this.props;
        if (!product) return null;
        return(
            <div className="ProductDetails">
                <h2>{product.name}</h2>
                <p>ID: {product.id}</p>
                <img src={product.imageURL} alt={product.name}></img>
                <p>Цена: {product.price} BYN</p>
                <p>Доступно на складе: {product.stock} шт.</p>
            </div>
        )
    }
}
export default ProductDetails;