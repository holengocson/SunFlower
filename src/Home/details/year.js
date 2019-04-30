import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ListView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-elements';
import firebase from 'react-native-firebase'
import PureChart from 'react-native-pure-chart';
import { home_dong } from '../../constants/constants';
import CardView from 'react-native-cardview'



const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });



let expenseInYear = 0
let incomeInYear = 0

let sampleData1 = []

class Year extends React.Component {

    constructor() {
        super()
        this.getData = this.getData.bind(this)
        this.state = {

            amountExpenseInYear: 0,
            amountIncomeInYear: 0,



            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            year: ''
        }
    }


    componentDidMount() {

        const { currentUser } = firebase.auth()

        var docRef = firebase.firestore().collection("User").doc(currentUser.uid);
        docRef.get()

            .then((responseJSON) => {



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




                this.setState({


                    amountExpenseInYear: expenseInYear,
                    amountIncomeInYear: incomeInYear,

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

            { month: new Date().getFullYear().toString(), dataExpense: expenseInYear, dataIncome: incomeInYear },


        ]
    }

    render() {

        const { amountExpenseInYear, amountIncomeInYear } = this.state

        sampleData1 = [
            { x: '2019', y: amountIncomeInYear - amountExpenseInYear },
            { x: '2018-01-02', y: 20000 },
            // { x: '2018-01-03', y: 170000 },
            // { x: '2018-01-04', y: 250 },
            // { x: '2018-01-05', y: 10 },
            // { x: '2018-01-01', y: 30 },
            // { x: '2018-01-02', y: 200 },
            // { x: '2018-01-03', y: 170 },
            // { x: '2018-01-04', y: 250 },
            // { x: '2018-01-05', y: 10 }
        ]

        sampleData = [

            {
                seriesName: 'income',
                data: [
                    { x: new Date().getFullYear().toString(), y: amountIncomeInYear },


                ],
                color: '#FFCB66'
            },
            {
                seriesName: 'expense',
                data: [
                    { x: new Date().getFullYear().toString(), y: amountExpenseInYear },


                ],
                color: '#F64444'
            }


        ]


        return (

            <View >



                <View style={{ margin: 10 }} >
                    <PureChart
                        
                        width={'100%'}
                        height={200}
                        data={sampleData} type='bar'
                        backgroundColor='#32404C'
                    />





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
                                    fontSize: 25,
                                    fontFamily: 'Roboto-Medium',
                                    color: 'white'
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
        backgroundColor: 'gray',
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
        margin: 15, borderBottomWidth: 0.5, backgroundColor: '#32404C',
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
})

export default Year;