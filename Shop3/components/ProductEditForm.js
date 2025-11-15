import React from "react";

class ProductEditForm extends React.Component {
    state = {
        name: this.props.product ? this.props.product.name : '',
        price: this.props.product ? this.props.product.price : '',
        url: this.props.product ? this.props.product.imageURL : '',
        stock: this.props.product ? this.props.product.stock : '',
        errors: {
            name: '',
            price: '',
            url: '',
            stock: '',
        },
        isValid: false,
        isModified: false,
    };

    componentDidMount() {
        this.validateAllFields();
    }
    componentDidUpdate(prevProps) {
        if (
            (this.props.product !== prevProps.product && this.props.product) ||
            (this.props.isAdding && !prevProps.isAdding)
        ) {
            this.setState({
                name: this.props.product.name,
                price: this.props.product.price,
                url: this.props.product.imageURL,
                stock: this.props.product.stock,
                errors: { name: '', price: '', url: '', stock: '' },
                isModified: false,
                isValid: false,
            },
                
                    this.validateAllFields(),
                );

        }
    }
    getValidationError(field, value) {
        let errorMsg = '';

        switch (field) {
            case 'name':
                if (!value.trim()) errorMsg = 'Введите название';
                break;
            case 'price':
                if (isNaN(value) || +value <= 0) errorMsg = 'Введите цену';
                break;
            case 'url':
                if (!value.trim()) errorMsg = 'Введите URL картинки';
                break;
            case 'stock':
                if (typeof value !== 'string') {
                    value = String(value);
                }

                if (value.trim() === '') {
                    errorMsg = 'Введите количество';
                } else if (!Number.isInteger(+value) || +value < 0) {
                    errorMsg = 'Введите корректное количество';
                }
                break;
        }
        return errorMsg;
    }

    validateField(field) {
        const value = this.state[field];
        const errorMsg = this.getValidationError(field, value);
        this.setState(prev => ({
            errors: { ...prev.errors, [field]: errorMsg }
        }));
    }

    validateAllFields() {
        const errors = {};
        ['name', 'price', 'url', 'stock'].forEach(field => {
            errors[field] = this.getValidationError(field, this.state[field]);
        });
        const isValid =
            Object.values(errors).every(error => error === '');
        this.setState({ errors, isValid });
    }
    handleInputChange = (field, value) => {
        this.setState({ [field]: value, isModified: true }, () => {
            this.validateField(field);
            this.validateAllFields();
            if (!this.props.setEditing) return;
            this.props.setEditing(true);
        });
    };

    handleSave = () => {
        if (!this.state.isValid) return;
        
        const updatedProduct = {
            ...this.props.product,
            name: this.state.name,
            price: this.state.price,
            imageURL: this.state.url,
            stock: this.state.stock
        };
        this.props.onSave(updatedProduct);
        if (this.props.setEditing) this.props.setEditing(false);
    };

    handleCancel = () => {
        this.props.onClose();
        if (this.props.setEditing) this.props.setEditing(false);
    };
    handleAdd = () => {
        if (!this.state.isValid) return;
        const idToUse = this.props.existingId;
        const newProduct = {
            id: idToUse,
            name: this.state.name,
            price: this.state.price,
            imageURL: this.state.url,
            stock: this.state.stock,
        };
        this.props.onSave(newProduct);
        if (this.props.setEditing) this.props.setEditing(false);
    };

    render() {
        const { product, onClose, isAdding, } = this.props;
        if (!product) return null;
        const { errors, isValid, } = this.state;
        return (
            <div>
                <h3>{isAdding ? 'Добавить новый товар' : 'Редактировать товар'}</h3>
                <p>ID: {product.id}</p>
                <div>
                    <label>Название</label>
                    <input value={this.state.name} onChange={(eo) => this.handleInputChange('name', eo.target.value)}></input>
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </div>
                <div>
                    <label>Цена</label>
                    <input value={this.state.price} onChange={(eo) => this.handleInputChange('price', eo.target.value)} ></input>
                    {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}
                </div>
                <div>
                    <label>URL</label>
                    <input value={this.state.url} onChange={(eo) => this.handleInputChange('url', eo.target.value)}></input>
                    {errors.url && <span style={{ color: 'red' }}>{errors.url}</span>}
                </div>
                <div>
                    <label>Доступно на складе</label>
                    <input value={this.state.stock} onChange={(eo) => this.handleInputChange('stock', eo.target.value)}></input>
                    {errors.stock && <span style={{ color: 'red' }}>{errors.stock}</span>}
                </div>
                <button onClick={isAdding ? this.handleAdd : this.handleSave} disabled={!isValid}>{isAdding ? 'Добавить' : 'Сохранить'}</button>
                <button onClick={onClose}>Отмена</button>

            </div>
        );
    }
}

export default ProductEditForm;

