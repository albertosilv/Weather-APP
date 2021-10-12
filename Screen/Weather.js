import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import *  as Location from 'expo-location'
import WeatherInfo from '../Components/WeatherInfo';
import UnitsPicker from '../Components/UnitsPicker';
import ReloadIcon from '../Components/ReloadIcon';
import WeatherDetails from '../Components/WeatherDetails';
import { colors } from '../Utils'
import { WEATHER_API_KEY } from '@env'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors

export default function Weather({route}) {
  const{latitude,longitude}  = route.params
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitsSystem])

  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
      const response = await fetch(weatherURL)
      const result = await response.json()

      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }

    } catch (err) {
      setErrorMessage(err.message)
    }
  }
  if (currentWeather) {

    return (

      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystems={setUnitsSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
      </View>

    );
  } else if (errorMessage) {

    return (

      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>

    )
  } else {
    return (

      <View style={styles.container}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
});
