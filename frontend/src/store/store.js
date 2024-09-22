import { configureStore } from '@reduxjs/toolkit'
import authslice from './authslice';
import compSlice from './compSlice';
 const store=configureStore({
    reducer:{
       auth: authslice,
       comp:compSlice
    },
 });
 export default store