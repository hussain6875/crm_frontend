// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from '../feature/leads/leadsSlice';

const store = configureStore({
    reducer: {
        leads: leadsReducer,
    },
});

export default store;
