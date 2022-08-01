import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  i18nReducer,
  loadTranslations,
  setLocale,
  syncTranslationWithStore,
} from 'react-redux-i18n'
import reducerRegistry from '../helpers/ReducerRegistry'

export const store = configureStore({
  reducer: {
    i18n: i18nReducer,
    ...reducerRegistry.reducers,
  },
})

reducerRegistry.setChangeListener((reducers) => {
  store.replaceReducer(
    combineReducers({
      i18n: i18nReducer,
      ...reducers,
    }),
  )
})

syncTranslationWithStore(store)
store.dispatch(loadTranslations({}))
store.dispatch(setLocale('en'))
