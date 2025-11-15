import React from 'react';
import Product from './Product';
import ProductDetails from './ProductDetails';
import ProductEditForm from './ProductEditForm'

import './Shop.css';

class Shop extends React.Component {

  state = {
    selectedProductId: null,
    products: this.props.products,
    showEditForm: false,
    editToProduct: null,
    isEditing: false,
    isAddingNew: false,
    newProductId: null,

  };
  handleRowClick = (productId) => {
    if (this.state.isEditing || this.state.isAddingNew) return;
    this.setState({
      selectedProductId: productId,
      showEditForm: false
    });
  };
  deleteRowClick = (productId) => {
    if (this.state.isAddingNew) return;
    if (window.confirm("Вы действительно хотите удалить этот товар?")) {
      this.setState((prevState) => {
        const updateProducts = prevState.products.filter(product => product.id !== productId);
        return {
          products: updateProducts,
          selectedProductId: null,
        };
      })
    }
  };
  handleShowEditForm = (productId) => {
    if (this.state.isAddingNew || this.state.isEditing) return;
    const product = this.state.products.find(p => p.id === productId);
    this.setState({ showEditForm: true, editToProduct: product, selectedProductId: product.id })
  };
  handleCloseEditForm = () => {
    this.setState({ showEditForm: false, editToProduct: null, isEditing: false, isAddingNew: false });
  };
 
  handleSaveProduct = (product) => {
  this.setState((prevState) => {
    const updateProducts = prevState.products;
    const index = updateProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      updateProducts[index] = product;
    } else {
      updateProducts.push(product);
    }
    return {
      products: updateProducts,
      showEditForm: false,
      editToProduct:null,
      selectedProduct: null,
      isEditing: false, 
      isAddingNew: false 
    };
  });
};
    handleAddNew = () => {
  const {products} = this.state; 

 const maxId = products.reduce(
      (max, item) => Math.max(max, parseInt(item.id, 10) || 0),
      0
    );
    const newId = (maxId + 1).toString(); 

  this.setState({
    showEditForm: true,
    editToProduct: {
      id: newId,
      name: '',
      price: '',
      imageURL: '',
      stock: '',
    },
    isAddingNew: true,
    selectedProductId: null,
    newProductId: newId
  });
};

  render() {
    const { name, address } = this.props;
    const { selectedProductId, products, showEditForm, editToProduct, isEditing, isAddingNew } = this.state;
    const selectedProduct = products.find((p) => p.id === selectedProductId);

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
                onRowDelete={this.deleteRowClick}
                onEdit={this.handleShowEditForm}
                isEditing={isEditing || isAddingNew}
      
              />

            ))}
          </tbody>
        </table>
        <input type='button' value="Новый продукт" disabled={isEditing || isAddingNew} onClick={this.handleAddNew}></input>

        {!showEditForm &&
          selectedProduct && !isAddingNew &&(
            <ProductDetails product={selectedProduct} />
          )}

        {showEditForm && (
          <ProductEditForm
            product={editToProduct}
            onClose={this.handleCloseEditForm}
            onSave={this.handleSaveProduct}
            setEditing={(val) => this.setState({isEditing: val })}
            isAdding={isAddingNew}
            existingId={this.state.newProductId}

          />
        )}
      </div>
    );
  }

}

export default Shop;
