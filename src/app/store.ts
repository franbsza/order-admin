import {
    configureStore, 
    ThunkAction, 
    Action } from '@reduxjs/toolkit';
import { ordersApiSlice } from '../features/orders/SliceOrder';
import { vehiclesApiSlice } from '../features/vehicle/SliceVehicle';
import { apiSlice } from '../features/api/apiSlice';
import { authSlice } from '../features/auth/SliceAuth';

    export const store =  configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            [ordersApiSlice.reducerPath]: apiSlice.reducer,
            [vehiclesApiSlice.reducerPath]: apiSlice.reducer,
            auth: authSlice.reducer,
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
              serializableCheck: false,
            }).concat(apiSlice.middleware);
          }
    })
    
    export type AppDispatch = typeof store.dispatch;
    export type RootState = ReturnType<typeof store.getState>;
    export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType, 
    RootState, 
    unknown, 
    Action<string>
    >