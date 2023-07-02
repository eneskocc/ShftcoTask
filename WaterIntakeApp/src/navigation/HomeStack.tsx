import * as React from 'react'
import Home from '../Screens/Home'
import { WaterInateStackNavigator } from './types'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateWaterIntake from '../Screens/CreateWaterIntake'

const Stack = createNativeStackNavigator<WaterInateStackNavigator>()

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Home',
        }}
      />
      <Stack.Screen
        name="CreateWaterIntake"
        component={CreateWaterIntake}
        options={{
          headerTitle: 'Create Water Intake',
        }}
      />
    </Stack.Navigator>
  )
}
