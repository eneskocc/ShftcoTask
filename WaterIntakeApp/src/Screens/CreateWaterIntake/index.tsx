import { View, Text, Dimensions, TouchableOpacity, FlatList, RefreshControl, Modal, Button, TextInput } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import {
  ProgressChart,
} from "react-native-chart-kit";
import { useQuery } from '@tanstack/react-query';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { LoadingIndicator } from '../../Components/LoadingIndicator';
import { createIntake, getWaterIntake, Goal, WaterIntake } from '../../lib/api';




const CreateWaterIntake = ({ navigation }) => {
  const [totalIntake, setTotalIntake] = useState(0)
  const [goal, setGoal] = useState({ Goal: 0, GoalType: 1 })
  const [amount, setAmount] = useState('');

  const screenWidth = Dimensions.get("window").width;

  const { isLoading, error, data, refetch } = useQuery<{ WaterIntake: WaterIntake[], Goal: Goal }, Error>(
    ['getWaterIntake'],
    () => getWaterIntake("1")
  )

  useEffect(() => {
    if (data) {
      setGoal({ Goal: data.Goal?.dailyGoal, GoalType: 1 })
    }
  }, [data])

  useEffect(() => {
    if (data) {
      let total: number = 0;
      const currentDate = new Date();
      const futureDate = new Date(currentDate.getTime() - (goal.GoalType * 24 * 60 * 60 * 1000));
      const toList: any = [];
      data.WaterIntake.map((item) => {
        const createdAt = new Date(item.createdAt);

        if (futureDate <= createdAt) {
          total = Number(total) + Number(item.amount);
          toList.push(item)
        }

      });
      setTotalIntake(total)
    }

  }, [goal])



  if (isLoading) return <LoadingIndicator />

  if (error) return <ErrorMessage message={error.message}></ErrorMessage>

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <View style={{ flex: 1, width: '100%' }}>
        <ProgressChart
          data={{
            data: [(totalIntake / goal.Goal) ? totalIntake / goal.Goal : 0]
          }}
          width={screenWidth}
          height={300}
          strokeWidth={24}
          radius={130}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0,206,209, ${opacity})`,
            labelColor: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 34
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          hideLegend={true}
        />
        <View style={{ position: 'relative', top: -160, width: '100%', alignItems: 'center' }}>
          <Text style={{ fontSize: 24 }}>{Math.floor(totalIntake / goal.Goal * 100).toString()} %</Text>
          <Text style={{ fontSize: 12 }}>{totalIntake.toString()}/{goal.Goal} ml</Text>
        </View>

      </View>

      <View style={{ width: '100%', alignItems: 'center' }}>
        <TextInput
          style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 12 }}
          onChangeText={(e) => setAmount(e)}
          value={amount}
          placeholder="Su miktarını girin..."
        />
        <TouchableOpacity
          onPress={() => {
            createIntake(Number(amount), "ml")
          }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
            marginBottom: 10
          }}>
          <Text style={{ fontSize: 30 }}>+</Text>
        </TouchableOpacity>

      </View>
      <View style={{ flex: 1, paddingHorizontal: 25, paddingVertical: 16 }}>
        <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora amet esse doloremque odit tenetur necessitatibus ipsum obcaecati facilis reprehenderit quasi beatae excepturi incidunt vero expedita, itaque cum vitae aperiam accusamus.</Text>
      </View>
    </View>
  )
}

export default CreateWaterIntake