import axios from 'axios';
import { Alert } from 'react-native';
import { apiUrl } from '../config';

export type WaterIntake = {
  amount: number
  createdAt: Date
  id: string
  unit: string
}

export type Goal = {
  dailyGoal: number,
  weeklyGoal: number,
  monthlyGoal: number,
  userId: 1
}





export async function getWaterIntake(id: string) {
  const res1 = await axios.get(apiUrl + "intake")
  const res2 = await axios.get(apiUrl + "goal/" + id)


  if (res1.data.length == 0) {
    throw new Error('Water Intake not found')
  }
  return { WaterIntake: res1.data, Goal: res2.data } as { WaterIntake: WaterIntake[], Goal: Goal };
}


export async function getWaterIntakeID(id: string) {

  const res1 = await axios.get(apiUrl + "intake/" + id)
  const res2 = await axios.get(apiUrl + "goal/" + id)

  if (res1.data.length == 0) {
    throw new Error('Water Intake not found')
  }
  return { WaterIntake: res1.data, Goal: res2.data } as { WaterIntake: WaterIntake[], Goal: Goal };
}


export const createIntake = async (amount: number, unit: string) => {
  try {
    const today = new Date()
    const res = await axios.post(apiUrl + "intake/", {
      amount: amount,
      unit: unit,
      createdAt: today
    });
    Alert.alert("Başarılı")
  } catch (error) {

    console.error(error);
  }
};


export const updateIntake = async (id: string, amount: number, unit: string) => {
  try {
    const today = new Date()
    const res = await axios.put(apiUrl + "intake/" + id, {
      amount: amount,
      unit: unit,
      createdAt: today
    });
    Alert.alert("Başarılı")
  } catch (error) {
    Alert.alert("Uyarı", error)
    console.error(error);
  }
};

export const deleteIntake = async (id) => {
  try {
    const res = await axios.delete(apiUrl + "intake/" + id);
  } catch (error) {
    Alert.alert("Uyarı", error)
    console.error(error);
  }
};