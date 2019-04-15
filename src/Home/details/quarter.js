import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ListView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-elements';
import firebase from 'react-native-firebase'
import PureChart from 'react-native-pure-chart';
import { home_dong } from '../../constants/constants';
import CardView from 'react-native-cardview'

const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

let expenseInQuaterOne = 0
let incomeInQuaterOne = 0


let expenseInQuaterTwo = 0
let incomeInQuaterTwo = 0

let expenseInQuaterThree = 0
let incomeInQuaterThree = 0

let expenseInQuaterFour = 0
let incomeInQuaterFour = 0



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
        var docRef = firebase.firestore().collection("User").doc("f3qytY21q3MH31obOJEP");
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

        sampleData = [

            {
                seriesName: 'income',
                data: [
                    { x: 'Quater I', y: amountIncomeInQuaterOne },
                    { x: 'Quater II', y: amountIncomeInQuaterTwo },
                    { x: 'Quater III', y: amountIncomeInQuaterThree },
                    { x: 'Quater IIII', y: amountIncomeInQuaterFour },

                ],
                color: '#33B54B'
            },
            {
                seriesName: 'expense',
                data: [
                    { x: 'Quater I', y: amountExpenseInQuaterOne },
                    { x: 'Quater II', y: amountExpenseInQuaterTwo },
                    { x: 'Quater III', y: amountExpenseInQuaterThree },
                    { x: 'Quater III', y: amountExpenseInQuaterFour },

                ],
                color: '#F05164'
            }


        ]


        return (

            <View >

                <ScrollView>
                    <CardView
                        style={styles.cardview}
                        cardElevation={10}

                        cornerRadius={5}>
                        <PureChart
                            width={'100%'}
                            height={200}
                            data={sampleData} type='bar' />
                    </CardView>

                    <CardView
                        style={styles.cardview}
                        cardElevation={10}>

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
                    </CardView>
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
        fontSize: 20,
        color: '#33B54B',

    },

    textExpense: {
        fontSize: 20,
        color: '#F05164',
        marginTop: 5

    },
    textAccu: {

        fontSize: 20,
        color: 'black',
        marginTop: 5,
        marginBottom: 5
    },
    cardview: {

        backgroundColor: 'white',
        margin: 5,
        padding: 5,
    },
})

export default Quarter;