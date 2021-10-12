import { createSlice } from '@reduxjs/toolkit'
const weather = createSlice({
    name: 'weather',
    initialState: {
        weather: []
    },
    reducers: {
        WeatherInclude(state, action) {
            if (!state.weather.some(e => {
                return e.city == action.payload.city
            })) {
                state.weather.unshift(action.payload)
                if (state.weather.length > 3) {
                    state.weather.pop()
                }
            }

        },
    },
})

export const { WeatherInclude } = weather.actions

export default weather.reducer