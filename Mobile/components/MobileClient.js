import React from 'react';
import PropTypes from 'prop-types';
import { mobileEvent } from './events';
import './MobileClient.css';

class MobileClient extends React.PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      isNew: PropTypes.bool,
      onEdit: PropTypes.func 
    }).isRequired,
    isNew: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = { isEditing: props.isNew || false};
    this.famRef = React.createRef();
    this.imRef = React.createRef();
    this.otchRef = React.createRef();
    this.balanceRef = React.createRef();

  }
componentDidMount() {
    if (this.props.isNew) {
      this.setState({ isEditing: true });
    }
  }
componentDidUpdate(prevProps) {
  if (prevProps.isNew && !this.props.isNew) {
    this.setState({ isEditing: false });
  }
}

 handleEdit = () => {
    this.setState({ isEditing: true });
    if (this.props.onEdit) {
      this.props.onEdit(); 
    }
  };

  handleCancel = () => {
    this.setState({ isEditing: false });
    mobileEvent.emit('cancelEdit', this.props.client.id);
  };

  handleSave = () => {
    const newFam = this.famRef.current.value;
    const newIm = this.imRef.current.value;
    const newOtch = this.otchRef.current.value;
    const newBalance = parseFloat(this.balanceRef.current.value);
    mobileEvent.emit('editClientField', { clientId: this.props.client.id, field: 'fam', value: newFam });
    mobileEvent.emit('editClientField', { clientId: this.props.client.id, field: 'im', value: newIm });
    mobileEvent.emit('editClientField', { clientId: this.props.client.id, field: 'otch', value: newOtch });
    mobileEvent.emit('editClientField', { clientId: this.props.client.id, field: 'balance', value: newBalance });
    this.setState({isEditing: false});
  };

  handleDelete = () => {
    mobileEvent.emit('deleteClient', this.props.client.id);
  };

  render() {

    console.log(`MobileClient id=${this.props.client.id} render`);
    const c = this.props.client;
    const editing = this.state.isEditing;
    const status = c.balance >= 0 ? 'active' : 'blocked';

    return (
      <div className='MobileClient'>
        {editing ? (
          <React.Fragment>
            <input defaultValue={c.fam} ref={this.famRef} />{' '}
            <input defaultValue={c.im} ref={this.imRef} />{' '}
            <input defaultValue={c.otch} ref={this.otchRef} />{' '}
            <input type='number' defaultValue={c.balance} ref={this.balanceRef} />
            <button onClick={this.handleSave}>Сохранить</button>
            <button onClick={this.handleCancel}>Отмена</button>
          </React.Fragment>
        ) : (
          <React.Fragment>

            <div className='MobileClientFIO'>
              <div>{c.fam}</div>
              <div>{c.im}</div>
              <div>{c.otch}</div>


            </div>
            <div className='MobileClientBalance'>{c.balance} </div>
            <div className='MobileClientBalance'>  {status === 'blocked' ? (
              <span className='status-blocked'>({status})</span>
            ) : (
              <span>({status})</span>
            )}</div>

            <button className='Button' onClick={this.handleEdit}>Редактировать</button>
            <button onClick={this.handleDelete}>Удалить</button>
          </React.Fragment>
        )}
      </div>
    );

  }

}

export default MobileClient;
