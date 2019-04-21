import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import firebase from 'react-native-firebase'

import MonthChart from './MonthChart'
import Current from './current'
import Quarter from './quarter'
import Year from './year'

import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import { FacebookTabBar } from './FacebookTabbar'



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
            // amountSumExpense: 0,
            // amoutSumIncome: 0,
            index: 0,
            name: ''

        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _goToMain = () => this.props.navigation.navigate('Main');

    componentDidMount() {
        this._isMounted = true;
        const {currentUser} = firebase.auth()
        var docRef = firebase.firestore().collection("User").doc(currentUser.uid);
        docRef.get()

            .then((responseJSON) => {
                
                if (this._isMounted) {
                    this.setState({
                         name: responseJSON.data().displayName

                    })
                }
            }
            )
            .catch((error) => {
                console.error(error);
            });

    }


    render() {
        const { expenseMount, amoutSumIncome, amountSumExpense } = this.state
        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222F38' }}>
                <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />

                {/* <Text

                >{amountSumExpense}</Text> */}
                <Icon
                    onPress={this._goToMain}
                    name="memory" size={48} />


                <View style={styles.settingsTitle}>


                    <Text style={{ fontSize: 28, fontFamily: 'Roboto-Medium', color: 'white' }}>Hello, {this.state.name}</Text>
                </View>

                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar />}
                    ref={(tabView) => { this.tabView = tabView; }}
                >
                    <Current tabLabel='Current'>Current</Current>
                    <MonthChart tabLabel='Month'></MonthChart>

                    <Quarter tabLabel='Quarter'></Quarter>
                    <Year tabLabel='Year'></Year>

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
        backgroundColor: '#222F38'


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
    settingsTitle: {
        flexDirection: 'column',
        marginTop: 25,
        marginBottom: 20
    },
})

export default financedetail;