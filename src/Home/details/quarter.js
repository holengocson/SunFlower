import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ListView, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-elements';
import firebase from 'react-native-firebase'
import PureChart from 'react-native-pure-chart';
import { home_dong } from '../../constants/constants';
import CardView from 'react-native-cardview'
import PieChart from 'react-native-pie-chart';


const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

let expenseInQuaterOne = 0
let incomeInQuaterOne = 0


let expenseInQuaterTwo = 0
let incomeInQuaterTwo = 0

let expenseInQuaterThree = 0
let incomeInQuaterThree = 0

let expenseInQuaterFour = 0
let incomeInQuaterFour = 0

let seriesIncome = []

let seriesExpense = []

class Quarter extends React.Component {

    constructor() {
        super()
        this.getData = this.getData.bind(this)
        this.state = {

            amountExpenseInQuaterOne: 0,
            amountIncomeInQuaterOne: 0,

            amountExpenseInQuaterTwo: 0,
            amountIncomeInQuaterTwo: 0,

            amountExpenseInQuaterThree: 0,
            amountIncomeInQuaterThree: 0,

            amountExpenseInQuaterFour: 0,
            amountIncomeInQuaterFour: 0,

            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        }
    }


    componentDidMount() {

        const { currentUser } = firebase.auth()

        var docRef = firebase.firestore().collection("User").doc(currentUser.uid);
        docRef.get()

            .then((responseJSON) => {

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (3 >= parseInt(responseJSON.data().expense[index].month) >= 1) {
                        expenseInQuaterOne += responseJSON.data().expense[index].amount;
                    }
                }
                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (3 >= parseInt(responseJSON.data().income[index].month) >= 1) {
                        incomeInQuaterOne += responseJSON.data().income[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (6 >= parseInt(responseJSON.data().expense[index].month) && parseInt(responseJSON.data().expense[index].month) >= 4) {
                        expenseInQuaterTwo += responseJSON.data().expense[index].amount;
                    }
                }
                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (6 >= parseInt(responseJSON.data().income[index].month) && parseInt(responseJSON.data().income[index].month) >= 4) {
                        incomeInQuaterTwo += responseJSON.data().income[index].amount;
                    }
                }


                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (9 >= parseInt(responseJSON.data().expense[index].month) && parseInt(responseJSON.data().expense[index].month) >= 7) {
                        expenseInQuaterThree += responseJSON.data().expense[index].amount;
                    }
                }
                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (9 >= parseInt(responseJSON.data().income[index].month) && parseInt(responseJSON.data().income[index].month) >= 7) {
                        incomeInQuaterThree += responseJSON.data().income[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (12 >= parseInt(responseJSON.data().expense[index].month) && parseInt(responseJSON.data().expense[index].month) >= 10) {
                        expenseInQuaterFour += responseJSON.data().expense[index].amount;
                    }
                }
                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (12 >= parseInt(responseJSON.data().income[index].month) && parseInt(responseJSON.data().income[index].month) >= 10) {
                        incomeInQuaterFour += responseJSON.data().income[index].amount;
                    }
                }




                this.setState({

                    amountExpenseInQuaterOne: expenseInQuaterOne,
                    amountIncomeInQuaterOne: incomeInQuaterOne,

                    amountExpenseInQuaterTwo: expenseInQuaterTwo,
                    amountIncomeInQuaterTwo: incomeInQuaterTwo,

                    amountExpenseInQuaterThree: expenseInQuaterThree,
                    amountIncomeInQuaterThree: incomeInQuaterThree,

                    amountExpenseInQuaterFour: expenseInQuaterFour,
                    amountIncomeInQuaterFour: incomeInQuaterFour,

                    dataSource: ds.cloneWithRows(this.getData())
                })
            }
            )
            .catch((error) => {
                console.error(error);
            });
    }

    getData() {
        return [

            { month: 'Quater I', dataExpense: expenseInQuaterOne, dataIncome: incomeInQuaterOne },
            { month: 'Quater II', dataExpense: expenseInQuaterTwo, dataIncome: incomeInQuaterTwo },
            { month: 'Quater III', dataExpense: expenseInQuaterThree, dataIncome: incomeInQuaterThree },

            { month: 'Quater IIII', dataExpense: expenseInQuaterFour, dataIncome: incomeInQuaterFour },



        ]
    }

    render() {

        const { amountExpenseInQuaterOne, amountIncomeInQuaterOne, amountExpenseInQuaterTwo, amountIncomeInQuaterTwo,
            amountExpenseInQuaterThree, amountIncomeInQuaterThree, amountExpenseInQuaterFour, amountIncomeInQuaterFour } = this.state

        const chart_wh = 150

        var sum = amountIncomeInQuaterOne + amountIncomeInQuaterTwo + amountIncomeInQuaterThree + amountIncomeInQuaterFour

        var sumExpense = amountExpenseInQuaterOne + amountExpenseInQuaterTwo + amountExpenseInQuaterThree + amountExpenseInQuaterFour


        if (amountIncomeInQuaterOne != 0 || amountIncomeInQuaterTwo != 0 || amountIncomeInQuaterThree != 0 || amountIncomeInQuaterFour != 0) {
            seriesIncome = [amountIncomeInQuaterOne, amountIncomeInQuaterTwo,amountIncomeInQuaterThree, amountIncomeInQuaterFour]
            
        }

        if (amountExpenseInQuaterOne != 0 || amountExpenseInQuaterTwo != 0 || amountExpenseInQuaterThree != 0 || amountExpenseInQuaterFour != 0) {
            seriesExpense = [amountExpenseInQuaterOne,amountExpenseInQuaterTwo,amountExpenseInQuaterThree,amountExpenseInQuaterFour]
        }


        const sliceColor = ['#FD5A9F', '#16BEE4', '#FEB59F', '#93D2F4']

        sampleData = [

            {
                seriesName: 'income',
                data: [
                    { x: 'Quater 1', y: amountIncomeInQuaterOne },
                    { x: 'Quater 2', y: amountIncomeInQuaterTwo },
                    { x: 'Quater 3', y: amountIncomeInQuaterThree },
                    { x: 'Quater 4', y: amountIncomeInQuaterFour },

                ],
                color: '#33B54B'
            },
            {
                seriesName: 'expense',
                data: [
                    { x: 'Quater 1', y: amountExpenseInQuaterOne },
                    { x: 'Quater 2', y: amountExpenseInQuaterTwo },
                    { x: 'Quater 3', y: amountExpenseInQuaterThree },
                    { x: 'Quater 4', y: amountExpenseInQuaterFour },

                ],
                color: '#F05164'
            }


        ]


        return (

            <View >

                <ScrollView>

                <Text style = {{padding: 10,  paddingTop: 15, color: 'white', fontFamily: 'Roboto-Bold', fontSize: 26}}>Income Analytics</Text>
                    <View
                        style={styles.appInfoItem}>

                        <View style={{ flexDirection: 'row', marginStart: 50 }}>

                            <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', marginTop: 20, paddingEnd: 30}}>
                                <PieChart
                                    chart_wh={chart_wh}
                                    series={seriesIncome}
                                    sliceColor={sliceColor}
                                    doughnut={true}
                                    coverRadius={0.55}
                                    coverFill={'#32404C'}
                                />

                                <View
                                    style={{ flexDirection: 'row', marginTop: 10, }}>
                                    <View style={styles.circle}></View>

                                    <View style={{ alignItems: 'flex-start', marginStart: 8 }}>
                                        <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Roboto-Regular' }} >Income</Text>
                                    </View>


                                </View>
                            </View>


                            <View style={{ width: '60%',  justifyContent: 'center', marginStart: 25}}>
                                <View
                                    style={{ flexDirection: 'row', marginTop: 10, }}>
                                    <View style={styles.circle1}></View>

                                    <View style={{ alignItems: 'flex-start', marginStart: 8 }}>
                                        <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Roboto-Regular' }} >{parseInt(amountIncomeInQuaterOne / sum * 100) + '% for Quater 1'}</Text>
                                    </View>


                                </View>
                                <View
                                    style={{ flexDirection: 'row', marginTop: 10, }}>
                                    <View style={styles.circle2}></View>

                                    <View style={{ alignItems: 'flex-start', marginStart: 8 }}>
                                        <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Roboto-Regular' }} >{parseInt(amountIncomeInQuaterTwo / sum * 100) + '% for Quater 2'}</Text>
                                    </View>


                                </View>
                                <View
                                    style={{ flexDirection: 'row', marginTop: 10, }}>
                                    <View style={styles.circle3}></View>

                                    <View style={{ alignItems: 'flex-start', marginStart: 8 }}>
                                        <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Roboto-Regular' }} >{parseInt(amountIncomeInQuaterThree/ sum * 100) + '% for Quater 3'}</Text>
                                    </View>


                                </View>
                                <View
                                    style={{ flexDirection: 'row', marginTop: 10, }}>
                                    <View style={styles.circle4}></View>

                                    <View style={{ alignItems: 'flex-start', marginStart: 8 }}>
                                        <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Roboto-Regular' }} >{parseInt(amountIncomeInQuaterFour/ sum * 100) + '% for Quater 4'}</Text>
                                    </View>


                                </View>

                            </View>

                        </View>
                    </View>








                    <Text style = {{padding: 10,  paddingTop: 15, color: 'white', fontFamily: 'Roboto-Bold', fontSize: 26}}>Expense Analytics</Text>

                    <View
                        style={styles.appInfoItem}>

                        <View style={{ flexDirection: 'row', marginStart: 50 }}>

                            <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', marginTop: 20, paddingEnd: 30}}>
                                <PieChart
                                    chart_wh={chart_wh}
                                    series={seriesExpense}
                                    sliceColor={sliceColor}
                                    doughnut={true}
                                    coverRadius={0.55}
                                    coverFill={'#32404C'}
                                />

                                <View
                                    style={{ flexDirection: 'row', marginTop: 10, }}>
                                    <View style={styles.circleExpense}></View>

                                    <View style={{ alignItems: 'flex-start', marginStart: 8 }}>
                                        <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Roboto-Regular' }} >Expense</Text>
                                    </View>


                                </View>
                            </View>


                            <View style={{ width: '60%', justifyContent: 'center', marginStart: 25 }}>
                                <View
                                    style={{ flexDirection: 'row', marginTop: 10, }}>
                                    <View style={styles.circle1}></View>

                                    <View style={{ alignItems: 'flex-start', marginStart: 8 }}>
                                        <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Roboto-Regular' }} >{parseInt(amountExpenseInQuaterOne / sumExpense * 100) + '% for Quater 1'}</Text>
                                    </View>


                                </View>
                                <View
                                    style={{ flexDirection: 'row', marginTop: 10, }}>
                                    <View style={styles.circle2}></View>

                                    <View style={{ alignItems: 'flex-start', marginStart: 8 }}>
                                        <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Roboto-Regular' }} >{parseInt(amountExpenseInQuaterTwo / sumExpense * 100) + '% for Quater 2'}</Text>
                                    </View>


                                </View>
                                <View
                                    style={{ flexDirection: 'row', marginTop: 10, }}>
                                    <View style={styles.circle3}></View>

                                    <View style={{ alignItems: 'flex-start', marginStart: 8 }}>
                                        <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Roboto-Regular' }} >{parseInt(amountExpenseInQuaterThree / sumExpense * 100) + '% for Quater 3'}</Text>
                                    </View>


                                </View>
                                <View
                                    style={{ flexDirection: 'row', marginTop: 10, }}>
                                    <View style={styles.circle4}></View>

                                    <View style={{ alignItems: 'flex-start', marginStart: 8 }}>
                                        <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Roboto-Regular' }} >{parseInt(amountExpenseInQuaterFour / sumExpense * 100) + '% for Quater 4'}</Text>
                                    </View>


                                </View>

                            </View>

                        </View>
                    </View>

                    



                    <View
                        style={styles.appInfoItem}
                       >

                        <ListView
                            enableEmptySections={true}
                            noScroll={true}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) =>



                                <View
                                    style={{
                                        flex: 1, flexDirection: 'row', margin: 8, borderBottomWidth: 0.5,
                                        borderColor: '#c9c9c9',
                                    }}>

                                    <Text style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        marginLeft: 12,
                                        justifyContent: 'center',
                                        color: 'white',fontSize: 25, fontFamily: 'Roboto-Medium'
                                    }}>{rowData.month}</Text>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        marginLeft: 12,
                                        justifyContent: 'center',
                                        alignItems: 'flex-end'
                                    }}>
                                        <Text style={styles.textIncome}>{rowData.dataIncome + home_dong}</Text>
                                        <Text style={styles.textExpense}>{rowData.dataExpense + home_dong}</Text>

                                        <View style={{ width: 200, height: 0.5, backgroundColor: '#d3d3d3', marginTop: 5 }}></View>

                                        <Text style={styles.textAccu}>{rowData.dataIncome - rowData.dataExpense + home_dong}</Text>

                                    </View>


                                </View>


                            }
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,

        marginTop: 50

    },
    textTitle: {
        color: 'blue',
        fontSize: 20,
    },
    textContent: {

        fontSize: 25,

    },
    cardview: {
        flex: 1,
        backgroundColor: 'white',
        margin: 5,
        padding: 5,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        position: 'relative',
        left: 0,
        top: 0

    },
    scene: {
        flex: 1,
    },

    textIncome: {
        fontSize: 22,
        color: '#FD5A9F',
        fontFamily: 'Roboto-Medium'
    },

    textExpense: {
        fontSize: 22,
        color: '#00E2DC',
        marginTop: 5,
        fontFamily: 'Roboto-Medium'

    },
    textAccu: {

        fontSize: 22,
        color: 'white',
        marginTop: 5,
        fontFamily: 'Roboto-Medium'
    },
    cardview: {

        backgroundColor: 'white',
        margin: 5,
        padding: 5,
    },

    appInfoItem: {
        flex: 1, flexDirection: 'row', margin: 15, borderBottomWidth: 0.5, backgroundColor: '#32404C',
        borderColor: '#c9c9c9',



        padding: 7,
        
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowRadius: 6,

        shadowOpacity: 0.5,
        borderRadius: 6
    },
    circleExpense: {
        width: 8,
        height: 8,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: '#F05164',
        marginTop: 4
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: '#139794',
        marginTop: 4

    },

   
    circle1: {
        width: 8,
        height: 8,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: '#FD5A9F',
        marginTop: 4

    },
    circle2: {
        width: 8,
        height: 8,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: '#16BEE4',
        marginTop: 4

    },
    circle3: {
        width: 8,
        height: 8,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: '#FEB59F',
        marginTop: 4

    },
    circle4: {
        width: 8,
        height: 8,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: '#93D2F4',
        marginTop: 4

    },

})

export default Quarter;