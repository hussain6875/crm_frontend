import { configureStore } from "@reduxjs/toolkit";
import dealReducer from './dealSlice';
 const store = configureStore({
    reducer:{
        deals:dealReducer,
    },    
 })
 export default store;