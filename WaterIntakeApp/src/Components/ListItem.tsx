import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { WaterIntake } from '../lib/api'


type Props = {
  item: WaterIntake
}

export function ListItem({ item, deleteIntake, updateIntake }) {
  return (
    <TouchableOpacity
    onPress={()=>updateIntake(item.id)}
      style={{
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 0.5
      }}>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 20, height: 20, borderRadius: 20, borderWidth: 1, marginRight: 16 }}></View>
          <Text style={{ fontSize: 12 }}>{item.amount} {item.unit}</Text>
        </View>
        <View><Text style={{ fontSize: 12 }}>{item.createdAt && item.createdAt.toString().split('T')[0]}</Text></View>
        <TouchableOpacity
          onPress={() => deleteIntake(item.id)}
          style={{
            width: 20,
            height: 20,
            borderRadius: 20,
            borderWidth: 1,
            marginRight: 16,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'red'
          }}>
          <Text style={{ fontSize: 16, color: 'red' }}>X</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

