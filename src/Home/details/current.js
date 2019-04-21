import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ListView,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-elements';
import firebase from 'react-native-firebase'
import PureChart from 'react-native-pure-chart';
import { home_dong } from '../../constants/constants';
import CardView from 'react-native-cardview'

const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

let expenseInMonth = 0
let incomeInMonth = 0

let expenseInYear = 0
let incomeInYear = 0

let expenseInDay = 0
let incomeInDay = 0


class Current extends React.Component {

    constructor(){
        super()
        this.getData = this.getData.bind(this)
        this.state = {
            amountExpenseInMonth: 0,
            amountIncomeInMonth: 0,

            amountExpenseInYear: 0,
            amountIncomeInYear: 0,

            amountExpenseInDay: 0,
            amountIncomeInDay: 0,

            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        }
    }


    componentDidMount() {

        const {currentUser} = firebase.auth()

        var docRef = firebase.firestore().collection("User").doc(currentUser.uid);
        docRef.get()

            .then((responseJSON) => {

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].month) == new Date().getMonth()) {
                        expenseInMonth += responseJSON.data().expense[index].amount;
                    }
                }
                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].month) == new Date().getMonth()) {
                        incomeInMonth += responseJSON.data().income[index].amount;
                    }
                }



                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].year) == new Date().getFullYear()) {
                        expenseInYear += responseJSON.data().expense[index].amount;
                    }
                }
                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].year) == new Date().getFullYear()) {
                        incomeInYear += responseJSON.data().income[index].amount;
                    }
                }



                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].day) == new Date().getDate()) {
                        expenseInDay += responseJSON.data().expense[index].amount;
                    }
                }
                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].day) == new Date().getDate()) {
                        incomeInDay += responseJSON.data().income[index].amount;
                    }
                }

                

                this.setState({
                    amountExpenseInMonth: expenseInMonth,
                    amountIncomeInMonth: incomeInMonth,

                    amountExpenseInYear: expenseInYear,
                    amountIncomeInYear: incomeInYear,

                    amountExpenseInDay: expenseInDay,
                    amountIncomeInDay: incomeInDay,


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

            { month: 'Today', dataExpense: expenseInDay, dataIncome: incomeInDay },

            { month: 'This month', dataExpense: expenseInMonth, dataIncome: incomeInMonth },

            { month: 'This year', dataExpense: expenseInYear, dataIncome: incomeInYear },

            
            
        ]
    }

    render() {



        return (

            <View >
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

export default Current;