import React from 'react';
import PropTypes from 'prop-types';
import {mobileEvent} from './events';
import MobileClient from './MobileClient';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fam: PropTypes.string.isRequired,
        im: PropTypes.string.isRequired,
        otch: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        
      })
    ),
  };

  state = {
    name: this.props.name,
    clients: [...this.props.clients],
    filter: 'all',
    editingClientId: null,
  };

  setName1 = () => {
    this.setState({name:'МТС'});
  };

  setName2 = () => {
    this.setState({name:'A1'});
  };
   componentDidMount() {
    
    mobileEvent.on('deleteClient', this.handleDelete);
    mobileEvent.on('editClientField', this.handleEditField);
    mobileEvent.on('saveClient', this.handleSave);
    mobileEvent.on('cancelEdit', this.handleCancel);
    mobileEvent.on('addClient', this.handleAddClient);
  }

  componentWillUnmount() {
    mobileEvent.off('deleteClient', this.handleDelete);
    mobileEvent.off('editClientField', this.handleEditField);
    mobileEvent.off('saveClient', this.handleSave);
    mobileEvent.off('cancelEdit', this.handleCancel);
    mobileEvent.off('addClient', this.handleAddClient);
  }

  handleDelete = (clientId) => {
    this.setState((prevState) => {
      const newClients = prevState.clients.filter(c => c.id !== clientId);
      return { clients: newClients };
    });
  };

  handleEditField = ({ clientId, field, value }) => {
   
    this.setState(prev => {
      const newClients = prev.clients.map(c => {
        if (c.id === clientId) {
          return { ...c, [field]: value, isNew: false };
        }
        return c;
      });
      return { clients: newClients };
    });
  };

  handleSave = () => {
    this.setState({ editingClientId: null });
  };

  handleCancel = () => {
    
  };

  handleAddClient = () => {
  
    const maxId = this.state.clients.reduce((max, c) => Math.max(max, c.id), 0);
    const newClient = {
      id: maxId + 1,
      fam: '',
      im: '',
      otch: '',
      balance: 0,
      isNew: true,
    };
    this.setState(prev => ({
      clients: [...prev.clients, newClient],
      editingClientId: newClient.id,
    }));
  };

  setFilter = (filter) => {
    this.setState({ filter, editingClientId: null });
  };
   handleEditClient = (clientId) => {
    this.setState({ editingClientId: clientId });
  };
  
  render() {

    console.log("MobileCompany render");
    const { clients, filter, editingClientId } = this.state;
let filteredClients = clients;
    if (filter === 'active') {
      filteredClients = clients.filter(c => c.balance > 0);
    } else if (filter === 'blocked') {
      filteredClients = clients.filter(c => c.balance <= 0);
    }

    const clientsCode = filteredClients.map(client => (
      <MobileClient 
      key={client.id} 
      client={client} 
      isNew={client.isNew} 
      isEditing={client.id === this.state.editingClientId }  
      onEdit={() => this.handleEditClient(client.id)}/>
    ));

    return (
      <div className='MobileCompany'>
        <input type="button" value="=МТС" onClick={this.setName1} />
        <input type="button" value="=A1" onClick={this.setName2} />
        <div className='MobileCompanyName'>Компания &laquo;{this.state.name}&raquo;</div>
        <div>
          <button onClick={() => this.setFilter('all')}>Все</button>
          <button onClick={() => this.setFilter('active')}>Активные</button>
          <button onClick={() => this.setFilter('blocked')}>Заблокированные</button>
        </div>
        <div className='Table'>
          <div>Фамилия</div>
          <div>Имя</div>
          <div>Отчество</div>
          <div>Баланс</div>
          <div>Статус</div>
          <div>Редактировать</div>
          <div>Удалить</div>

        </div>
        <div className='MobileCompanyClients'>
          {clientsCode}
        </div>
        <button onClick={() => mobileEvent.emit('addClient')}>Добавить клиента</button>
      </div>
    )
    ;

  }

}

export default MobileCompany;
