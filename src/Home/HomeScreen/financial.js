import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, ListView, ActivityIndicator, Dimensions, TouchableHighlight } from 'react-native'
import firebase from 'react-native-firebase'
import { home_dong } from '../../constants/constants';


var income = 0
var expense = 0

class Financial extends Component {
    _isMounted = false;
    constructor() {
        super()
        this.state = {
            incomeMount: 0,
            expenseMount: 0,
            amountSumExpense: 0,
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

    componentWillUnmount() {
        this._isMounted = false;
    }


    componentDidMount() {
        this._isMounted = true;

        const { currentUser } = firebase.auth()
        var docRef = firebase.firestore().collection("User").doc(currentUser.uid);
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

               

                expenseMount = responseJSON.data().previousAmountExpense,
                incomeMount =  responseJSON.data().previousAmountIncome

                if (this._isMounted) {
                    if (responseJSON.data().previousAmountExpense == null) {
                        expenseMount = 0
                    }
    
                    if (responseJSON.data().previousAmountIncome == null) {
                        incomeMount = 0
                    }
                    this.setState({
                        // incomeMount: income,
                        // expenseMount: expense,

                        

                        amountSumExpense: expenseMount,
                        amoutSumIncome: incomeMount
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
        const { expenseMount, amountSum, amoutSumIncome, amountSumExpense } = this.state

        var finance = amoutSumIncome - amountSumExpense

        if (finance == 0 | amoutSumIncome == null || amountSumExpense == null) {
            finance = 0
        } else {
            finance = amoutSumIncome - amountSumExpense
        }

        return <View >

            <Text style={styles.textContent}>{finance + ' ' + home_dong}</Text>
        </View>

    }

}

const styles = StyleSheet.create({

    container: {

        justifyContent: 'center',
        alignItems: 'center',


    },

    textContent: {
        marginStart: 15,
        color: 'white',
        fontSize: 25,
        fontFamily: 'Roboto-Bold',
        letterSpacing: 5,
        marginBottom: 15

    }
})

export default Financial