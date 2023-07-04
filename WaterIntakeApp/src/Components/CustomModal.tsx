import { StyleSheet, Text, View, Modal, Button, TextInput } from 'react-native'
import React, { useState } from 'react'

const CustomModal = ({ id, setModalVisible, modalVisible, deleteIntake, updateIntake, setOnRefresh, onRefresh }) => {
  const [UpdateVisible, setUpdateVisible] = useState(false);
  const [amount, setAmount] = useState('');
  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(256, 256, 256,0.1)', borderWidth: 1 }}>
        {
          !UpdateVisible ?
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8 }}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Uyarı</Text>
              <Text>Bu bir küçük modal örneğidir.</Text>
              <Button title="Güncelle" onPress={() => setUpdateVisible(true)} />
              <Button title="Sil" onPress={() => {
                deleteIntake()
                setAmount("")
                setOnRefresh(!onRefresh)
                setUpdateVisible(false)
                setModalVisible(false)
              }} />
            </View>
            :
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8 }}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Uyarı</Text>
              <TextInput
                style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 12 }}
                onChangeText={(e) => setAmount(e)}
                value={amount}
                placeholder="Su miktarını girin..."
              />
              <View>
                <Button title="Güncelle" onPress={() => {
                  updateIntake(id, Number(amount), "ml")
                  setAmount("")
                  setOnRefresh(!onRefresh)
                  setUpdateVisible(false)
                  setModalVisible(false)

                }} />
                <Button title="Vazgeç" onPress={() => setModalVisible(false)} />
              </View>

            </View>
        }

      </View>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({})