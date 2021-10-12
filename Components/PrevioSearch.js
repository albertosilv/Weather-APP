import React, { useState } from 'react'
import { View, Text, TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 

import { colors } from '../Utils'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors
export default function PrevioSearch({handleLocation,location}) {
    console.log(location)
    return (
        <TouchableOpacity style={styles.container}onPress={()=>handleLocation(location)}>
            <View style={styles.buttonContainer}>
                <View>
                    <Text style={styles.textPrimary}>{location.city}</Text>
                    <Text style={styles.textSecundary}>{location.state},{location.country}</Text>
                </View>
                <AntDesign name="arrowright" size={30} color={PRIMARY_COLOR} />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#DBDBDB',
      justifyContent: 'center',
      margin:5,
      padding:15,
      borderRadius:20,
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderLeftColor:PRIMARY_COLOR,
        borderLeftWidth:2,
        padding:10
    },
    textPrimary:{
        fontSize:18,
        color:'#000',
        fontWeight:'700'
    },
    textSecundary:{
        fontSize:15,
        color:'#000',
    }
  });
  