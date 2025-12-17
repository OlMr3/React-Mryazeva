import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    companyName: '',
    clients: [],
    editingClientId: null,
    status: 'idle',
    error: null,
}

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setCompanyName: (state, action) => {
            state.companyName = action.payload;
        },
        setEditingClientId: (state, action) => {
            state.editingClientId = action.payload;
        },
        deleteClient: (state, action) => {
            state.clients = state.clients.filter(c => c.id !== action.payload);
            state.editingClientId = null;
        },
        editClientField: (state, action) => {
            const { clientId, field, value } = action.payload;
            const client = state.clients.find(c => c.id === clientId);
            if (client) {
                client[field] = value;
                client.isNew = false;
            }
        },
        addClient: (state) => {
            const maxId = state.clients.reduce((max, c) => Math.max(max, c.id), 0);
            const newClient = {
                id: maxId + 1,
                fam: '',
                im: '',
                otch: '',
                balance: 0,
                isNew: true,
            };
            state.clients.push(newClient);
            state.editingClientId = newClient.id;
        },
        fetchDataStart: (state) => {
            state.status = 'loading';
        },
        fetchDataSuccess: (state, action) => {
            state.status = 'succeeded';
            state.companyName = action.payload.companyName;
            state.clients = action.payload.clientsArr.map(client => ({
                ...client,
                isNew: false
            }));
        },
        fetchDataFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },


    }
});

export const { 
  setCompanyName, 
  setEditingClientId, 
  deleteClient, 
  editClientField, 
  addClient,
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure
} = clientsSlice.actions;

export default clientsSlice.reducer;