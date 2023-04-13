import { configureStore } from '@reduxjs/toolkit';
import databaseReducer from './Database';

export default configureStore({
    reducer: {
        database: databaseReducer,
    },
})