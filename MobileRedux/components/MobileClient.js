import React, { useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { mobileEvent } from './events';
import './MobileClient.css';

function MobileClientInner({ client, isNew, isEditing, onEdit, clientId }) {
  const famRef = useRef();
  const imRef = useRef();
  const otchRef = useRef();
  const balanceRef = useRef();

  const handleEdit = () => {
    if (onEdit) {
      onEdit(clientId);
    }
  };

  const handleCancel = () => {
    mobileEvent.emit('cancelEdit', client.id);
  };
  const handleSave = () => {
    const newFam = famRef.current.value;
    const newIm = imRef.current.value;
    const newOtch = otchRef.current.value;
    const newBalance = parseFloat(balanceRef.current.value);
    mobileEvent.emit('editClientField', { clientId: client.id, field: 'fam', value: newFam });
    mobileEvent.emit('editClientField', { clientId: client.id, field: 'im', value: newIm });
    mobileEvent.emit('editClientField', { clientId: client.id, field: 'otch', value: newOtch });
    mobileEvent.emit('editClientField', { clientId: client.id, field: 'balance', value: newBalance });
    mobileEvent.emit('saveClient')
  };

  const handleDelete = () => {
    mobileEvent.emit('deleteClient', client.id);
  };

  console.log(`MobileClient id=${client.id} render`);
  const status = client.balance >= 0 ? 'active' : 'blocked';
  return(
    <div className='MobileClient'>
        {isEditing ? (
          <React.Fragment>
            <input defaultValue={client.fam} ref={famRef} />{' '}
            <input defaultValue={client.im} ref={imRef} />{' '}
            <input defaultValue={client.otch} ref={otchRef} />{' '}
            <input type='number' defaultValue={client.balance} ref={balanceRef} />
            <button onClick={handleSave}>Сохранить</button>
            <button onClick={handleCancel}>Отмена</button>
          </React.Fragment>
        ) : (
          <React.Fragment>

            <div className='MobileClientFIO'>
              <div>{client.fam}</div>
              <div>{client.im}</div>
              <div>{client.otch}</div>


            </div>
            <div className='MobileClientBalance'>{client.balance} </div>
            <div className='MobileClientBalance'>  {status === 'blocked' ? (
              <span className='status-blocked'>({status})</span>
            ) : (
              <span>({status})</span>
            )}</div>

            <button className='Button' onClick={handleEdit}>Редактировать</button>
            <button onClick={handleDelete}>Удалить</button>
          </React.Fragment>
        )}
      </div>
  )
}
const MobileClient = memo(MobileClientInner);

MobileClient.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fam: PropTypes.string.isRequired,
    im: PropTypes.string.isRequired,
    otch: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    isNew: PropTypes.bool,
  }).isRequired,
  isNew: PropTypes.bool,
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  clientId: PropTypes.number.isRequired,
};
export default MobileClient;
