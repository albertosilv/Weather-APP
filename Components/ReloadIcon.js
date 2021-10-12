import React from 'react'
import { View, Text,Platform,StyleSheet } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {colors} from '../Utils'
const {PRIMARY_COLOR,SECONDARY_COLOR,BORDER_COLOR}  = colors
export default function ReloadIcon({load}) {
    const reloadIcon = Platform.OS=='ios'?'ios-refresh':'md-refresh'
    return (
        <View style={styles.reloadIcon}>
            <Ionicons onPress={load} name={reloadIcon} size={24} color={PRIMARY_COLOR} />
        </View>
    )
}
const styles = StyleSheet.create({
    reloadIcon: {
      position:'absolute',
      top:40,
      right:20,
    },
  });