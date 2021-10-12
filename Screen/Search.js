import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import PrevioSearch from '../Components/PrevioSearch';
import *  as Location from 'expo-location'
import { useSelector,useDispatch } from 'react-redux'
import {WeatherInclude} from '../Store/Weather.store'
import { colors } from '../Utils'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors
export default function Search({navigation}) {
    const weather=  useSelector((state) => state.weather.weather)
    const dispatch = useDispatch()
    console.log(weather)
    const [error, setError] = useState({
        message:'',
        activated:false
    })
    const [locationSearch, setLocationSearch] = useState()
    const LocationHandle = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status != 'granted') {
            setErrorMessage('Acess to location is needed  to run the app')
            return
        }

        const location = await Location.getCurrentPositionAsync()
        const { latitude, longitude } = location.coords
        navigation.push('Weather',{latitude,longitude})
    }
    const InputHandle = async () => {
        setError({
            message:'',
            activated:false
        })
        try {
            const weatherURL = `https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${locationSearch}`
            const response = await fetch(weatherURL)
            const result = (await response.json()).results
      
            if (response.ok) {
                const location = result.find(e=>{
                    const components = e.components
                    const city = locationSearch.split(',')
                    if(city[0].trim() ==components.city){
                        return true
                    }
                })
                dispatch(WeatherInclude({
                    geometry:location.geometry,
                    city:location.components.city,
                    state:location.components.state_code,
                    country:location.components.country
                }))
                const{lat,lng} = location.geometry
                navigation.push('Weather',{latitude:lat,longitude:lng})
            } else {
                setError({
                    message:'Cidade não encontrada',
                    activated:true
                })
            }
      
          } catch (err) {
            setError({
                message:'Cidade não encontrada',
                activated:true
            })
          }
    }
    const handlePrevio=(data)=>{
        navigation.push('Weather',{latitude:data.geometry.lat,longitude:data.geometry.lng})
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Type your location here:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setLocationSearch}
                value={locationSearch}
                placeholder="Location"
            />
            <View style={{display:error.activated?'flex':'none'}}>
                <Text style={styles.error}>{error.message}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => InputHandle()}>
                    <Text style={styles.textButton}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.button, paddingHorizontal: 45 }} onPress={() => LocationHandle()}>
                    <MaterialIcons name="my-location" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <View>
                {weather.map(e=>(
                    <PrevioSearch key={e.city} handleLocation={handlePrevio} location={e}/>
                ))}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15
    },
    input: {
        borderColor: '#d3d3d3',
        borderRadius: 20,
        borderWidth: 2,
        padding: 10,
        fontSize: 18,
        marginVertical: 10,
    },
    text: {
        fontSize: 18,
        color: '#000'
    },
    buttonContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        backgroundColor: '#FF2E4E',
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 20
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    },
    error:{
        fontSize: 18,
        color: PRIMARY_COLOR
    }
})
