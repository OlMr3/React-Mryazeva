import React, { useState, useEffect, memo, useCallback } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { 
  setCompanyName, 
  setEditingClientId, 
  deleteClient, 
  editClientField, 
  addClient 
} from '../redux/clientsSlice';
import { fetchMobileCompanyLoad } from '../redux/MobileCompanyLoad';
import { mobileEvent } from './events';
import MobileClient from './MobileClient';

import './MobileCompany.css';
const MobileCompany = memo(() => {
  const dispatch = useDispatch();
  const { companyName, clients, editingClientId, status, error } = useSelector(state => state.clients);
  const [filter, setFilter] = useState('all');
  

 const setName1 = () => {
   dispatch (setCompanyName('МТС'));
  };

  const setName2 = () => {
    dispatch (setCompanyName('A1'));
  };

   useEffect(() => {
    dispatch(fetchMobileCompanyLoad());
  }, [dispatch]);

  useEffect(() => {
    const handleDelete = (clientId) => {
      dispatch(deleteClient(clientId));
    };
    const handleEditField = ({ clientId, field, value }) => {
      dispatch(editClientField({ clientId, field, value }));
    };
    const handleSave = () =>{
      dispatch(setEditingClientId(null));
    };
    const handleCancel = () => {
      dispatch(setEditingClientId(null));
    };
    const handleAddClient = () => {
      dispatch (addClient());
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

  }, [dispatch])

  const handleSetFilter = (newFilter) => {
    setFilter(newFilter);
    dispatch(setEditingClientId(null));
  };


   const handleEditClient = useCallback((clientId) => {
    dispatch(setEditingClientId(clientId));
  }, [dispatch]);

  console.log("MobileCompany render");

  if(status === 'loading'){
    return <div>Загрузка...</div>
  }
  if (status === 'failed') {
    return <div>Ошибка: {error}</div>;
  }
   if (!clients) {
    return <div>Загрузка данных...</div>;
  }
const currentClients = clients || [];
  let filteredClients = currentClients;
  if (filter === 'active') {
    filteredClients = currentClients.filter(c => c.balance > 0);
  } else if (filter === 'blocked') {
    filteredClients = currentClients.filter(c => c.balance <= 0);
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
        {clientsCode.length > 0 ? clientsCode : <div>Нет клиентов для отображения</div>}
      </div>
      <button onClick={() => mobileEvent.emit('addClient')}>Добавить клиента</button>
    </div>
  );
}); 

export default MobileCompany;
