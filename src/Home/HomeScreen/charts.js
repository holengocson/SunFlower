import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, ListView, ActivityIndicator, Dimensions, TouchableHighlight } from 'react-native'
import firebase from 'react-native-firebase'

import PureChart from 'react-native-pure-chart';
import { ifStatement } from '@babel/types';

// let sampleData = [
//     { seriesName: 'series1', data: [30], color: 'green' },
//     { seriesName: 'series1', data: [100], color: 'red' }
// ]

let sampleData

var income = 0
var expense = 0

class Charts extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            incomeMount: 0,
            expenseMount: 0,
            items: '',
            amountSumExpense: 0,
            amoutSumIncome: 0,
            
        }
    }

    componentDidMount() {

        var docRef = firebase.firestore().collection("User").doc("f3qytY21q3MH31obOJEP");
        docRef.get()

            .then((responseJSON) => {

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (responseJSON.data().income[index].amount != null) {
                        income += responseJSON.data().income[index].amount;
                    }


                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (responseJSON.data().expense[index].amount != null) {
                        expense += responseJSON.data().expense[index].amount;
                    }


                }

                this.setState({
                    incomeMount: income,
                    expenseMount: expense,
                    // amountSumExpense: responseJSON.data().previousAmountExpense,
                    // amoutSumIncome: responseJSON.data().previousAmountIncome,
                    // changeState: true
                })
            }
            )
            .catch((error) => {
                console.error(error);
            });

    }
    render() {

        const { incomeMount } = this.state
        const { expenseMount, amoutSumIncome, amountSumExpense } = this.state
        const { items } = this.state

        const { currentUser } = this.state
        sampleData = [
            { seriesName: 'series1', data: [incomeMount], color: '#33B54B' },
            { seriesName: 'series1', data: [expenseMount], color: '#F05164' }
        ]
        return (


            <View
                style={{ marginTop: 20, flexDirection: 'row' }}>


                <View style={styles.flexContainer}>
                    <PureChart

                        width={'%100'}
                        height={150}
                        data={sampleData} type='bar' />
                </View>

                <View style={{
                    flex: 3,
                    flexDirection: 'column'
                }} >

                    <View style={styles.itemRow}>
                        <View style={styles.circle}>
                        </View>



                        <Text style={styles.itemTitle}>Income</Text>

                        <Text style={styles.itemRight}>{incomeMount}</Text>
                    </View>


                    <View style={styles.itemRow}>
                        <View style={styles.circleExpense}>
                        </View>

                        <Text style={styles.itemTitle}>Expense</Text>

                        <Text style={styles.itemRight}>{expenseMount}</Text>
                    </View>





                    <View style={styles.itemRow}>
                        <View style={styles.circle}>
                        </View>

                        <Text style={styles.itemTitle}>DDDADAD</Text>

                        <Text style={styles.itemRight}>{incomeMount - expenseMount}</Text>
                    </View>



                </View>


            </View>

            // <View >

        );
    }
}

export default Charts





const styles = StyleSheet.create({
    flexContainer: {
        flex: 2,
        backgroundColor: 'gray'
    },
    circle: {
        width: 15,
        height: 15,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: '#33B54B',
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 5
    },
    circleExpense: {
        width: 15,
        height: 15,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: '#F05164',
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 5
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row'
        , justifyContent: 'center',
        alignItems: 'center'
    },
    itemTitle: {
        flex: 1,

        fontSize: 20
    },
    itemRight: {
        flex: 1,
        textAlign: 'right',
        fontSize: 20
    }

})