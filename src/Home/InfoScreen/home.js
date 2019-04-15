import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


class Home extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Memory",
        headerLeft: (
            <TouchableOpacity
                
                onPress={() => navigation.openDrawer()}>
                <Icon name="bars" size={20} />
            </TouchableOpacity>
        ),

    })

    render() {
        return (
            <View >
                <Text>Info Screen</Text>
                <Icon name="memory" size={48} />

            </View>
        );
    }
}



export default Home;