

import {
  combineReducers,
  configureStore,
  PreloadedState,
  ThunkAction,
  Action
} from '@reduxjs/toolkit'
import gameReducer from '../features/game/totito';
import resultReducer from '../features/game/result';

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
    result: resultReducer,
    game: gameReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
