import { configureStore } from '@reduxjs/toolkit'
import WeatherStore from './Weather.store'
export const store = configureStore({
  reducer: {
      weather:WeatherStore
  },
})