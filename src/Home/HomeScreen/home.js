import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, Alert, StyleSheet, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import List from './list'
import CardView from 'react-native-cardview'
import Charts from './charts'
import ActionButton from 'react-native-action-button';
import Financial from './financial'


const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);
class Home extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#05ADEE',

        },
        title: "Home",
        headerTintColor: 'white',
        headerRight: (

            <TouchableOpacity
                // style={Styles.headerButton}
                onPress={() => { }}>
                <Icon name="bars" size={20} color='white' />
            </TouchableOpacity>
        ),

    })

    render() {
        return (
            <View style = {styles.container}>
                <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
                <ScrollView>
                <CardView
                        style={styles.cardview}
                        cardElevation={10}

                        cornerRadius={5}>
                        <Text style={styles.textContent}>
                            FINANCIAL
                        </Text>
                        <Financial></Financial>
                    </CardView>


                    <CardView
                        style={styles.cardview}
                        cardElevation={10}

                        cornerRadius={5}>
                        <Text style={styles.textContent}>
                            Charts
                        </Text>
                        <Charts></Charts>
                    </CardView>
                    

                    <CardView
                        style={styles.cardview}
                        cardElevation={10}

                        cornerRadius={5}>
                        <Text style={styles.textContent}>
                            RECENT TRANSACTION
                        </Text>
                        <List></List>
                    </CardView>


                    
                    
                    <ActionButton
                       
                        buttonColor="rgba(231,76,60,1)"
                        onPress={() => { this.props.navigation.navigate('AddNew') }}
                    />
                </ScrollView>
                
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
})

export default Home;