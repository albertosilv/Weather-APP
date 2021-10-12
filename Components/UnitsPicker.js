import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {colors} from '../Utils'
const {PRIMARY_COLOR,SECONDARY_COLOR,BORDER_COLOR}  = colors
import {Picker} from '@react-native-community/picker'
export default function UnitsPicker({unitsSystem,setUnitsSystems}) {
    return (
      <View style={styles.unitsPicker}>
        <Picker selectedValue={unitsSystem} onValueChange={(item)=>setUnitsSystems(item)} mode="dropdown" itemStyle={{fontSize:12}}>
                <Picker.Item label="C°" value="metric" />
                <Picker.Item label="F°" value="imperial" />
        </Picker>
      </View>
    )
}

const styles = StyleSheet.create({
  unitsPicker: {
    position:'absolute',
    top:30,
    left:20,
    height:50,
    width:100
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
  description:{
      textTransform:'uppercase',
  }
});
