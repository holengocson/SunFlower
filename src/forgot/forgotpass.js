import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, TextInput, Alert, ScrollView, ActivityIndicator, NavigationActions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInputLayout } from 'rn-textinputlayout';
import CardView from 'react-native-cardview'
import firebase from 'react-native-firebase'
const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);


export default class ForgotPasswordScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
    }

    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    onBackToLoginPress = () => {
        // var navActions = NavigationActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: "SignIn" })]
        // });
        // this.props.navigation.dispatch(navActions);
        this.props.navigation.navigate('SignIn')
    }
    
    render() {

        return (

            <View style={styles.container}>
                <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F6F8' }}>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
                        <Image
                            source={require('./icon.png')}
                            style={{ width: 150, height: 150 }}></Image>
                    </View>
                    <View style={{
                        width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: '#C6C7C9',
                        borderWidth: 0.5,
                    }}>
                        <Image
                            source={require('./email.png')}
                            style={{ width: 37, height: 37 }}></Image>
                        <TextInput style={styles.textInput}
                            value={this.state.email}
                            onChangeText={(text) => { this.setState({ email: text }) }}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>



                    <TouchableOpacity
                        onPress={() => {this.onResetPasswordPress()}}
                        style={styles.button}>
                        <Text style={styles.submitText}>Reset Email</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => { this.onBackToLoginPress() }}
                        style={styles.button}>
                        <Text style={styles.backText}>Back to Login</Text>
                    </TouchableOpacity>
                    {this.state.loading &&
                        <View style={styles.loading}>
                            <ActivityIndicator />
                        </View>
                    }



                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },

    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        height: 50,
        // width: '85%',

        color: '#C6C7C9',

        justifyContent: 'center',

        paddingLeft: 15
    },
    textInput1: {
        fontSize: 16,
        height: 40,
        color: 'white',

        justifyContent: 'center',
        marginTop: 8,

    },
    inputLayout: {
        marginTop: 16,
        width: '90%',

    },
    submitText: {
        color: '#fff',
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        letterSpacing: 3,
        margin: 10,
        textAlign: 'center',
    },

    backText: {
        color: '#fff',
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        letterSpacing: 3,
        margin: 10,
        textAlign: 'center',
    },
    button: {
        width: '85%',
        borderRadius: 25,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: '#139794',
        shadowColor: '#B5DDDA',
        shadowOpacity: 0.8,
        elevation: 6,
        marginTop: 30,
        shadowRadius: 13,
        shadowOffset: { width: 1, height: 13 },
        color: '#FFFFFF'

    },
    textNotHaveAccount: {
        color: '#C6C7C9',
        fontFamily: 'Roboto-Light',
        fontSize: 18,


        textAlign: 'center',
    },
    textSignUp: {
        color: 'orange',
        fontFamily: 'Roboto-Light',
        fontSize: 15,


        textAlign: 'center',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }

})
