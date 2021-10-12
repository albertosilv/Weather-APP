import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Search from './Screen/Search'
import Weather from './Screen/Weather'
import { Provider } from 'react-redux'
import { store } from './Store'
const WeatherStack = createStackNavigator()
export default () => (
  <Provider store={store}>
    <NavigationContainer>
      <WeatherStack.Navigator>
        <WeatherStack.Screen name="Search" component={Search} />
        <WeatherStack.Screen name="Weather" component={Weather} />
      </WeatherStack.Navigator>
    </NavigationContainer>
  </Provider>
)