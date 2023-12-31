import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import { movieApi } from '../services/MovieApi';

const rootReducer = combineReducers({
  [movieApi.reducerPath]: movieApi.reducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(movieApi.middleware),
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
