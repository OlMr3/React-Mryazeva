import {fetchDataStart, fetchDataSuccess, fetchDataFailure} from './clientsSlice';

export const fetchMobileCompanyLoad = () => {
    return async (dispatch) => {
        dispatch(fetchDataStart());
        try{
            const response = await fetch('https://fe.it-academy.by/Examples/mobile_company.json');
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            dispatch(fetchDataSuccess({
                clientsArr: data.clientsArr || [], 
                companyName: data.companyName || ''
            }));

        } catch (error) {
            console.error('Fetch error:', error);
            dispatch(fetchDataFailure(error.message));
        }
    };
};