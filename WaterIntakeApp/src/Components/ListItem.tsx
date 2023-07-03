import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native'
import { WaterIntake } from '../lib/api'
import CustomModal from './CustomModal'


type Props = {
  item: WaterIntake
}

export function ListItem({ item, deleteIntake, updateIntake, onRefresh }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
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

      </View>
      <CustomModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        deleteIntake={() => deleteIntake(item.id)}
        updateIntake={updateIntake}
        id={item.id}
        onRefresh={onRefresh} />
    </TouchableOpacity>
  )
}

