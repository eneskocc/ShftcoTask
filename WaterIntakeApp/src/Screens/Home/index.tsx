import { View, Text, Dimensions, TouchableOpacity, FlatList, RefreshControl, Modal, Button } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import {
    ProgressChart,
} from "react-native-chart-kit";
import { useQuery } from '@tanstack/react-query';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { LoadingIndicator } from '../../Components/LoadingIndicator';
import { deleteIntake, getWaterIntake, Goal, updateIntake, WaterIntake } from '../../lib/api';
import { ListItem } from '../../Components/ListItem';
import { useRefreshByUser } from '../../hooks/useRefreshByUser';
import { useRefreshOnFocus } from '../../hooks/useRefreshOnFocus';


const Home = ({ navigation }) => {
    const [totalIntake, setTotalIntake] = useState(0)
    const [goal, setGoal] = useState({ Goal: 0, GoalType: 1 })
    const [dataToList, setdataToList] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
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
            setdataToList(toList)
            setTotalIntake(total)
        }

    }, [goal])

    const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch)
    useRefreshOnFocus(refetch)

    if (isLoading) return <LoadingIndicator />

    if (error) return <ErrorMessage message={error.message}></ErrorMessage>

    const renderItem = ({ item }) => {

        return <ListItem
            item={item}
            updateIntake={() => updateIntake(item.id, 12, "ml")}
            deleteIntake={() => deleteIntake(item.id)} />
    }


    return (
        <View style={{ flex: 1, alignItems: 'center',backgroundColor:'white' }}>
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
                <View style={{
                    width: '90%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderTopWidth: 1,
                    paddingHorizontal: 25,
                    paddingVertical: 10
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            setGoal({ Goal: data.Goal?.dailyGoal, GoalType: 1 })

                        }}
                        style={{
                            height: 50,
                            width: 75,
                            borderRadius: 25,
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{ fontSize: 16 }}>Günlük</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setGoal({ Goal: data.Goal?.weeklyGoal, GoalType: 7 })
                        }}
                        style={{
                            height: 50,
                            width: 75,
                            borderRadius: 25,
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{ fontSize: 16 }}>Haftalık</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setGoal({ Goal: data.Goal?.monthlyGoal, GoalType: 30 })
                        }}
                        style={{
                            height: 50,
                            width: 75,
                            borderRadius: 25,
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{ fontSize: 16 }}>Aylık</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('CreateWaterIntake')
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
            <FlatList
                style={{ flex: 2, width: '90%' }}
                data={dataToList}
                renderItem={(item) => renderItem(item)}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetchingByUser}
                        onRefresh={refetchByUser}
                    />
                }
            ></FlatList>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(256, 256, 256,0.1)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8 }}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Uyarı</Text>
                        <Text>Bu bir küçük modal örneğidir.</Text>
                        <Button title="Güncelle" onPress={() => setModalVisible(false)} />
                        <Button title="Sil" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Home