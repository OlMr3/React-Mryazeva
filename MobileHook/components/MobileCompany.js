import React, { useState, useEffect, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { mobileEvent } from './events';
import MobileClient from './MobileClient';

import './MobileCompany.css';

function MobileCompanyInner({ name, clients }) {
  const [companyName, setCompanyName] = useState(name);
  const [clientsState, setClientsState] = useState([...clients]);
  const [filter, setFilter] = useState('all');
  const [editingClientId, setEditingClientId] = useState(null);

  const setName1 = () => {
    setCompanyName('МТС');
  };

  const setName2 = () => {
    setCompanyName('A1');
  };

  useEffect(() => {

    const handleDelete = (clientId) => {
      setClientsState(prev => prev.filter(c => c.id !== clientId)
      );
    };

    const handleEditField = ({ clientId, field, value }) => {
      setClientsState(prev => prev.map(c =>
        c.id === clientId ? { ...c, [field]: value, isNew: false } : c
      ));
    };

    const handleSave = () => {
      setEditingClientId(null);
    };

    
    const handleCancel = () => {
    
    };

    const handleAddClient = () => {
      const maxId = clientsState.reduce((max, c) => Math.max(max, c.id), 0);
      const newClient = {
        id: maxId + 1,
        fam: '',
        im: '',
        otch: '',
        balance: 0,
        isNew: true,
      };
      setClientsState(prev => [...prev, newClient]);
      setEditingClientId(newClient.id);
    };
    mobileEvent.on('deleteClient', handleDelete);
    mobileEvent.on('editClientField', handleEditField);
    mobileEvent.on('saveClient', handleSave);
    mobileEvent.on('cancelEdit', handleCancel);
    mobileEvent.on('addClient', handleAddClient);

    return () => {
      mobileEvent.off('deleteClient', handleDelete);
      mobileEvent.off('editClientField', handleEditField);
      mobileEvent.off('saveClient', handleSave);
      mobileEvent.off('cancelEdit', handleCancel);
      mobileEvent.off('addClient', handleAddClient);
    };
  }, [clientsState]);
  const handleSetFilter = (newFilter) => {
    setFilter(newFilter);
    setEditingClientId(null);
  };

  const handleEditClient = useCallback((clientId) => {
    setEditingClientId(clientId);
  }, []);
 
  console.log("MobileCompany render");

  let filteredClients = clientsState;
  if (filter === 'active') {
    filteredClients = clientsState.filter(c => c.balance > 0);
  } else if (filter === 'blocked') {
    filteredClients = clientsState.filter(c => c.balance <= 0);
  }

  const clientsCode = filteredClients.map(client => (
    <MobileClient
      key={client.id}
      client={client}
      isNew={client.isNew}
      isEditing={client.id === editingClientId}
      onEdit={handleEditClient}
      clientId={client.id}
    />
  ));
  return (
    <div className='MobileCompany'>
      <input type="button" value="=МТС" onClick={setName1} />
      <input type="button" value="=A1" onClick={setName2} />
      <div className='MobileCompanyName'>Компания &laquo;{companyName}&raquo;</div>
      <div>
        <button onClick={() => handleSetFilter('all')}>Все</button>
        <button onClick={() => handleSetFilter('active')}>Активные</button>
        <button onClick={() => handleSetFilter('blocked')}>Заблокированные</button>
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
  );
}

const MobileCompany = memo(MobileCompanyInner);

MobileCompany.propTypes = {
  name: PropTypes.string.isRequired,
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MobileCompany;
