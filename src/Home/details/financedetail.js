import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import firebase from 'react-native-firebase'

import MonthChart from './MonthChart'
import Current from './current'
import Quarter from './quarter'
import Year from './year'

import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'



const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);


class financedetail extends React.Component {
    _isMounted = false;
    constructor() {
        super(),
            this._goToMain = this._goToMain.bind(this)
        this.state = {
            amountSumExpense: 0,
            amoutSumIncome: 0,
            index: 0,

        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _goToMain = () => this.props.navigation.navigate('Main');

    componentDidMount() {
        this._isMounted = true;
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

                if (this._isMounted) {
                    this.setState({
                        // incomeMount: income,
                        // expenseMount: expense,
                        amountSumExpense: responseJSON.data().previousAmountExpense,
                        amoutSumIncome: responseJSON.data().previousAmountIncome,

                    })
                }
            }
            )
            .catch((error) => {
                console.error(error);
            });

    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#05ADEE',

        },
        title: "Details",
        headerTintColor: 'white',
        headerRight: (

            <TouchableOpacity
                // style={Styles.headerButton}
                onPress={this._goToMain}>
                <Icon name="bars" size={20} color='white' />
            </TouchableOpacity>
        ),

    })

    render() {
        const { expenseMount, amoutSumIncome, amountSumExpense } = this.state
        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />

                <Text

                >{amountSumExpense}</Text>
                <Icon
                    onPress={this._goToMain}
                    name="memory" size={48} />

                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar />}
                    ref={(tabView) => { this.tabView = tabView; }}
                >
                <Current tabLabel='Current'>Current</Current>
                    <MonthChart tabLabel='Month'></MonthChart>
                    
                    <Quarter tabLabel='Quarter'></Quarter>
                    <Year tabLabel = 'Year'></Year>

                    {/* <TouchableOpacity tabLabel='Back' onPress={() => this.tabView.goToPage(0)}>
                        <Text>Lets go back!</Text>
                    </TouchableOpacity> */}
                </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,


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
})

export default financedetail;