import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, ListView, ActivityIndicator, Dimensions, TouchableHighlight } from 'react-native'
import firebase from 'react-native-firebase'
import { home_dong } from '../../constants/constants';


var income = 0
var expense = 0

class Financial extends Component {

    constructor() {
        super()
        this.state = {
            incomeMount: 0,
            expenseMount: 0,
            amountSumExpense : 0,
            amoutSumIncome: 0
        }
    }

    // componentDidUpdate(){
    //     var docRef = firebase.firestore().collection("User").doc("f3qytY21q3MH31obOJEP");
    //     docRef.get()

    //         .then((responseJSON) => {

    //             // for (let index = 0; index < responseJSON.data().income.length; index++) {
    //             //     if (responseJSON.data().income[index].amount != null) {
    //             //         income += responseJSON.data().income[index].amount;
    //             //     }


    //             // }

    //             // for (let index = 0; index < responseJSON.data().expense.length; index++) {
    //             //     if (responseJSON.data().expense[index].amount != null) {
    //             //         expense += responseJSON.data().expense[index].amount;
    //             //     }


    //             // }

    //             this.setState({
    //                 // incomeMount: income,
    //                 // expenseMount: expense,
    //                 amountSumExpense: responseJSON.data().previousAmountExpense,
    //                 amoutSumIncome: responseJSON.data().previousAmountIncome
    //             })
    //         }
    //         )
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

    
    componentDidMount() {

        var docRef = firebase.firestore().collection("User").doc("f3qytY21q3MH31obOJEP");
        docRef.get()

            .then((responseJSON) => {

                // for (let index = 0; index < responseJSON.data().income.length; index++) {
                //     if (responseJSON.data().income[index].amount != null) {
                //         income += responseJSON.data().income[index].amount;
                //     }


                // }

                // for (let index = 0; index < responseJSON.data().expense.length; index++) {
                //     if (responseJSON.data().expense[index].amount != null) {
                //         expense += responseJSON.data().expense[index].amount;
                //     }


                // }

                this.setState({
                    // incomeMount: income,
                    // expenseMount: expense,
                    amountSumExpense: responseJSON.data().previousAmountExpense,
                    amoutSumIncome: responseJSON.data().previousAmountIncome
                })
            }
            )
            .catch((error) => {
                console.error(error);
            });
        
    }

    render() {
        const { incomeMount } = this.state
        const { expenseMount, amountSum,amoutSumIncome,amountSumExpense } = this.state

        var finance = amoutSumIncome - amountSumExpense

        if (finance == 0 | finance == null){
            finance = 0
        }else {
            finance = amoutSumIncome - amountSumExpense
        }

        return <View style={styles.container}>

            <Text style={styles.textContent}>{finance + ' ' + home_dong}</Text>
        </View>

    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textContent: {

        color: '#F05164',
        fontSize: 25,

        margin: 30,

    }
})

export default Financial