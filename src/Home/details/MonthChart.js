import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ListView, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-elements';
import firebase from 'react-native-firebase'
import PureChart from 'react-native-pure-chart';
import { home_dong } from '../../constants/constants';
import CardView from 'react-native-cardview'



let sampleData
let amountSumInMonth
let dataByMonth

let income = 0
let incomeJanuary = 0
let incomeFebruary = 0
let incomeApril = 0
let incomeMay = 0
let incomeJune = 0
let incomeJuly = 0
let incomeAugust = 0
let incomeSeptember = 0
let incomeOctober = 0
let incomeNovember = 0
let incomeDecember = 0

let expenseJanuary = 0
let expenseFebruary = 0
let expenseMarch = 0
let expenseApril = 0
let expenseMay = 0
let expenseJune = 0
let expenseJuly = 0
let expenseAugust = 0
let expenseSeptember = 0
let expenseOctober = 0
let expenseNovember = 0
let expenseDecember = 0

const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

class MonthChart extends React.Component {
    _isMounted = false;
    constructor() {
        super(),
            this._goToMain = this._goToMain.bind(this)
        this.getData = this.getData.bind(this)
        this.state = {
            amountSumExpense: 0,
            amoutSumIncome: 0,
            index: 0,

            amountInJanury: 0,
            amountInFebruary: 0,
            amountSumInMonth: 0,
            amountInApril: 0,
            amountInMay: 0,
            amountInJune: 0,
            amountInJuly: 0,
            amountInAugust: 0,
            amountInSeptember: 0,
            amountInOctober: 0,
            amountInNovember: 0,
            amountInDecember: 0,

            expenseJanuary: 0,
            expenseFebruary: 0,
            expenseMarch: 0,
            expenseApril: 0,
            expenseMay: 0,
            expenseJune: 0,
            expenseJuly: 0,
            expenseAugust: 0,
            expenseSeptember: 0,
            expenseOctober: 0,
            expenseNovember: 0,
            expenseDecember: 0,
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),

        }
    }

    componentWillUnmount() {
        this._isMounted = false;
         income = 0
 incomeJanuary = 0
 incomeFebruary = 0
 incomeApril = 0
 incomeMay = 0
 incomeJune = 0
 incomeJuly = 0
 incomeAugust = 0
 incomeSeptember = 0
 incomeOctober = 0
 incomeNovember = 0
 incomeDecember = 0

 expenseJanuary = 0
 expenseFebruary = 0
 expenseMarch = 0
 expenseApril = 0
 expenseMay = 0
 expenseJune = 0
 expenseJuly = 0
 expenseAugust = 0
 expenseSeptember = 0
 expenseOctober = 0
 expenseNovember = 0
 expenseDecember = 0
    }

    _goToMain = () => this.props.navigation.navigate('Main');

    componentDidMount() {
        this._isMounted = true;

        const { currentUser } = firebase.auth()

        var docRef = firebase.firestore().collection("User").doc(currentUser.uid);
        docRef.get()

            .then((responseJSON) => {

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].month) == 1) {
                        incomeJanuary += responseJSON.data().income[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].month) == 2) {
                        incomeFebruary += responseJSON.data().income[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].month) == 3) {
                        income += responseJSON.data().income[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].month) == 4) {
                        incomeApril += responseJSON.data().income[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].month) == 5) {
                        incomeMay += responseJSON.data().income[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].month) == 6) {
                        incomeJune += responseJSON.data().income[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].month) == 7) {
                        incomeJuly += responseJSON.data().income[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].month) == 8) {
                        incomeAugust += responseJSON.data().income[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].month) == 9) {
                        incomeSeptember += responseJSON.data().income[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].month) == 10) {
                        incomeOctober += responseJSON.data().income[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].month) == 11) {
                        incomeNovember += responseJSON.data().income[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (parseInt(responseJSON.data().income[index].month) == 12) {
                        incomeDecember += responseJSON.data().income[index].amount;
                    }
                }







                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].month) == 1) {
                        expenseJanuary += responseJSON.data().expense[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].month) == 2) {
                        expenseFebruary += responseJSON.data().expense[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].month) == 3) {
                        expenseMarch += responseJSON.data().expense[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].month) == 4) {
                        expenseApril += responseJSON.data().expense[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].month) == 5) {
                        expenseMay += responseJSON.data().expense[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].month) == 6) {
                        expenseJune += responseJSON.data().expense[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].month) == 7) {
                        expenseJuly += responseJSON.data().expense[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].month) == 8) {
                        expenseAugust += responseJSON.data().expense[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].month) == 9) {
                        expenseSeptember += responseJSON.data().inexpensecome[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].month) == 10) {
                        expenseOctober += responseJSON.data().expense[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].month) == 11) {
                        expenseNovember += responseJSON.data().expense[index].amount;
                    }
                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (parseInt(responseJSON.data().expense[index].month) == 12) {
                        expenseDecember += responseJSON.data().expense[index].amount;
                    }
                }






                if (this._isMounted) {
                    this.setState({
                        // incomeMount: income,
                        // expenseMount: expense,
                        amountInJanury: incomeJanuary,
                        amountInFebruary: incomeFebruary,
                        amountSumInMonth: income,
                        amountInApril: incomeApril,
                        amountInMay: incomeMay,
                        amountInJune: incomeJune,
                        amountInJuly: incomeJuly,
                        amountInAugust: incomeAugust,
                        amountInSeptember: incomeSeptember,
                        amountInOctober: incomeOctober,
                        amountInNovember: incomeNovember,
                        amountInDecember: incomeDecember,

                        expenseJanuary: expenseJanuary,
                        expenseFebruary: expenseFebruary,
                        expenseMarch: expenseMarch,
                        expenseApril: expenseApril,
                        expenseMay: expenseMay,
                        expenseJune: expenseJune,
                        expenseJuly: expenseJuly,
                        expenseAugust: expenseAugust,
                        expenseSeptember: expenseSeptember,
                        expenseOctober: expenseOctober,
                        expenseNovember: expenseNovember,
                        expenseDecember: expenseDecember,


                        amountSumExpense: responseJSON.data().previousAmountExpense,
                        amoutSumIncome: responseJSON.data().previousAmountIncome,

                        dataSource: ds.cloneWithRows(this.getData())

                    })
                }
            }
            )
            .catch((error) => {
                console.error(error);
            });

    }

    getData() {
        return [
            { month: 'January', dataExpense: expenseJanuary, dataIncome: incomeJanuary },
            { month: 'February', dataExpense: expenseFebruary, dataIncome: incomeFebruary },
            { month: 'March', dataExpense: expenseMarch, dataIncome: income },
            { month: 'April', dataExpense: expenseApril, dataIncome: incomeApril },
            { month: 'May', dataExpense: expenseMay, dataIncome: incomeMay },
            { month: 'June', dataExpense: expenseJune, dataIncome: incomeJune },
            { month: 'July', dataExpense: expenseJuly, dataIncome: incomeJuly },
            { month: 'August', dataExpense: expenseAugust, dataIncome: incomeAugust },
            { month: 'September', dataExpense: expenseSeptember, dataIncome: incomeSeptember },
            { month: 'October', dataExpense: expenseOctober, dataIncome: incomeOctober },
            { month: 'November', dataExpense: expenseNovember, dataIncome: incomeNovember },
            { month: 'December', dataExpense: expenseDecember, dataIncome: incomeDecember },
        ]
    }



    render() {
        const { amountInJanury, amountInFebruary, amountSumInMonth, amountInApril, amountInMay, amountInJune, amountInJuly, amountInAugust, amountInSeptember, amountInOctober, amountInNovember, amountInDecember } = this.state
        const { expenseJanuary, expenseFebruary, expenseMarch, expenseApril, expenseMay, expenseJune, expenseJuly,
            expenseAugust, expenseSeptember, expenseOctober, expenseNovember, expenseDecember } = this.state
      
        sampleData = [

            {
                seriesName: 'income',
                data: [
                    { x: 'Jan', y: amountInJanury },
                    { x: 'Feb', y: amountInFebruary },
                    { x: '3', y: amountSumInMonth },
                    { x: '4', y: amountInApril },

                    { x: '5', y: amountInMay },
                    { x: '6', y: amountInJune },
                    { x: '7', y: amountInJuly },
                    { x: '8', y: amountInAugust },
                    { x: '9', y: amountInSeptember },
                    { x: '10', y: amountInOctober },
                    { x: '11', y: amountInNovember },
                    { x: '12', y: amountInDecember },
                ],
                color: '#FFCB66'
            },
            {
                seriesName: 'expense',
                data: [
                    { x: 'Jan', y: expenseJanuary },
                    { x: 'Feb', y: expenseFebruary },
                    { x: '3', y: expenseMarch },
                    { x: '4', y: expenseApril },

                    { x: '5', y: expenseMay },
                    { x: '6', y: expenseJune },
                    { x: '7', y: expenseJuly },
                    { x: '8', y: expenseAugust },
                    { x: '9', y: expenseSeptember },
                    { x: '10', y: expenseOctober },
                    { x: '11', y: expenseNovember },
                    { x: '12', y: expenseDecember },
                ],
                color: '#F64444'
            }


        ]

        return (

            <View style={styles.container}>

                <ScrollView >

                    <Text style = {{padding: 10,  paddingTop: 15, color: 'white', fontFamily: 'Roboto-Bold', fontSize: 26}}>Charts</Text>
            
                    <View style = {{margin: 10}} >
                        <PureChart
                            backgroundColor='#32404C'

                            width={'100%'}
                            height={200}
                            color='red'
                            data={sampleData} type='bar' />

                    </View>

                    <Text style = {{padding: 10,  paddingTop: 15, color: 'white', fontFamily: 'Roboto-Bold', fontSize: 26}}>Transactions</Text>

                    <ListView  
                            style = {{marginHorizontal: 5}}
                            enableEmptySections={true}
                            noScroll={true}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) =>



                                <View
                                    style={styles.appInfoItem}>

                                    <Text style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        marginLeft: 12,
                                        justifyContent: 'center',
                                        color: 'white', 
                                        fontSize: 18,
                                        fontFamily: 'Roboto-Medium'
                                    }}>{rowData.month}</Text>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        marginLeft: 12,
                                        justifyContent: 'center',
                                        alignItems: 'flex-end',
                                        marginEnd: 12
                                    }}>
                                        <Text style={styles.textIncome}>{rowData.dataIncome + home_dong}</Text>
                                        <Text style={styles.textExpense}>{rowData.dataExpense + home_dong}</Text>

                                        <View style={{ width: 200, height: 0.5, backgroundColor: '#d3d3d3', marginTop: 5 }}></View>

                                        <Text style={styles.textAccu}>{rowData.dataIncome - rowData.dataExpense + home_dong}</Text>

                                    </View>


                                </View>


                            }
                        />
                </ScrollView>


            </View>
        )
    }
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#222F38',
        paddingTop: 10

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
        backgroundColor: '#33414B'


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
        flex: 1, flexDirection: 'row', margin: 8,  borderBottomWidth: 0.5, backgroundColor: '#32404C',
                                        borderColor: '#c9c9c9',
        
       

        padding: 7,
        marginHorizontal: 5,
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowRadius: 6,
        
        shadowOpacity: 0.5,
        borderRadius: 6
    }

})


export default MonthChart;