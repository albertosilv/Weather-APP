import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {colors} from '../Utils'
const {PRIMARY_COLOR,SECONDARY_COLOR,BORDER_COLOR}  = colors
export default function WeatherInfo({currentWeather}) {
  const{ 
      main:{temp},
      weather:[details],
      name
    } = currentWeather 
    const{icon,main,description} = details
    const iconURl = `https://openweathermap.org/img/wn/${icon}@4x.png`
    return (
      <View style={styles.weatherInfo}>
        <Text>{name}</Text>
        <Image style={styles.icon}source={{uri:iconURl}}/>
        <Text style={styles.textPrimary}>{temp}°</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.textSecundary}>{main}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems:'center',
  },
  main:{
    justifyContent:'center',
    flex:1
  },
  icon:{
    width:100,
    height:100
  },
  textPrimary:{
      fontSize:40,
      color:PRIMARY_COLOR
  },
  textSecundary:{
    fontSize:20,
    color:SECONDARY_COLOR,
    fontWeight:'500',
    marginTop:10
  },
  description:{
      textTransform:'uppercase',
  }
});
