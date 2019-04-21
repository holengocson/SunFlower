import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ListView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-elements';
import firebase from 'react-native-firebase'
import PureChart from 'react-native-pure-chart';
import { home_dong } from '../../constants/constants';
import CardView from 'react-native-cardview'

import Modal from "react-native-modal";

class AppInfo extends React.Component {


    constructor() {
        super()

    }





    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'blue' }}>
                <Text>Hello!</Text>
                <TouchableOpacity onPress={this._toggleModal}>
                    <Text>Hide me!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default AppInfo;