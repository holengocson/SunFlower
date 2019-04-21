import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, ListView, ActivityIndicator, Dimensions, TouchableHighlight } from 'react-native'
import firebase from 'react-native-firebase'

import PureChart from 'react-native-pure-chart';



let sampleData

var income = 0
var expense = 0

class Charts extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            incomeMount: 0,
            expenseMount: 0,
            items: '',
            previousAmountIncome: 0,
            previousAmountExpense: 0

        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        const { currentUser } = firebase.auth()
        var docRef = firebase.firestore().collection("User").doc(currentUser.uid);
        docRef.get()

            .then((responseJSON) => {



                income = responseJSON.data().previousAmountIncome
                expense = responseJSON.data().previousAmountExpense



                if (this._isMounted) {

                    if (responseJSON.data().previousAmountIncome == null) {
                        income = 0
                    }

                    if (responseJSON.data().previousAmountExpense == null) {
                        expense = 0
                    }

                    this.setState({
                        incomeMount: income,
                        expenseMount: expense,

                    })
                }


            }
            )
            .catch((error) => {
                console.error(error);
            });

    }
    render() {

        const { incomeMount } = this.state
        const { expenseMount } = this.state
        const { items } = this.state

        const { currentUser } = this.state

        

        sampleData = [
            { seriesName: 'series1', data: [incomeMount], color: '#33B54B' },
            { seriesName: 'series1', data: [expenseMount], color: '#F05164' }
        ]
        return (

            <View
                style={{ marginTop: 20, flexDirection: 'row', backgroundColor: '#F5F6F8', }}>


                <View style={styles.flexContainer}>
                    <PureChart
                        backgroundColor = '#F5F6F8'
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

                        <Text style={styles.itemTitle}>Accumate</Text>

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
        backgroundColor: '#F5F6F8',
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
        fontFamily: 'Roboto-Medium',
        color: 'gray',
        fontSize: 20
    },
    itemRight: {
        flex: 1,
        textAlign: 'right',
        fontSize: 21,
        fontFamily: 'Roboto-Bold',
        letterSpacing: 2,
        color: 'gray'
    },
    textContent: {

        fontSize: 18,
        letterSpacing: 3,
        color: 'white',
        fontFamily: 'Roboto-Medium',
        margin: 10,
        padding: 5
    },

})