import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, TextInput, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInputLayout } from 'rn-textinputlayout';
import CardView from 'react-native-cardview'
import firebase from 'react-native-firebase'
import Modal from "react-native-modal";
import { appInfo_1, appInfo_2, appInfo_3, appInfo_4 } from '../../constants/constants';


const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Home extends React.Component {

    _isMounted = false;

    constructor() {
        super(),
            this.showSighOutAlert = this.showSighOutAlert.bind(this)
        this.signOut = this.signOut.bind(this)
        this.state = ({
            email: '',
            isModalVisible: false,
            displayName: '',
            phoneNumber: ''
        })
    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });


    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    changePassword = (currentPassword, newPassword) => {
        this.reauthenticate(currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newPassword).then(() => {
                Alert.alert("Password updated!");
            }).catch((error) => { Alert.alert(error); });
        }).catch((error) => { Alert.alert(error); });
    }

    showSighOutAlert() {
        Alert.alert(
            'Confirmation',
            'Do you want to Log Out?',
            [
                //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                    text: 'Cancel',

                    style: 'cancel',
                },
                { text: 'OK', style: 'destructive', onPress: () => this.signOut() },
            ],
            { cancelable: true },
        );
    }

    signOut = async () => {

        try {

            await firebase.auth().signOut();
            this.props.navigation.navigate('SignIn');
        } catch (e) {
            this.hideLoading()
            console.log(e);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        const { currentUser } = firebase.auth()

        var docRef = firebase.firestore().collection("User").doc(currentUser.uid);
        docRef.get()

            .then((responseJSON) => {

                if (this._isMounted) {
                    this.setState({

                        email: responseJSON.data().email,
                        displayName: responseJSON.data().displayName,
                        phoneNumber: responseJSON.data().phoneNumber
                    });
                }



            }
            )
            .catch((error) => {
                console.error(error);
            });

    }

    showAppInfo() {
        return (
            <Modal isVisible={this.state.isModalVisible}>
                <View style={styles.appInfoContainer}>


                    <View style={{ justifyContent: 'center' }}>
                        <Image
                            source={require('./firework.png')}
                            style={{ width: 100, height: 100, marginBottom: 20, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                        >
                        </Image>
                    </View>

                    <TouchableOpacity
                        style={styles.appInfoItem}

                    >
                        <View style={styles.itemContainer}>

                            <View style={{ flexDirection: 'column', width: '100%', marginStart: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>{appInfo_1}</Text>

                            </View>

                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.appInfoItem}

                    >
                        <View style={styles.itemContainer}>

                            <View style={{ flexDirection: 'column', width: '100%', marginStart: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>{appInfo_2}</Text>

                            </View>

                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.appInfoItem}

                    >
                        <View style={styles.itemContainer}>

                            <View style={{ flexDirection: 'column', width: '100%', marginStart: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>{appInfo_3}</Text>

                            </View>

                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.appInfoItem}

                    >
                        <View style={styles.itemContainer}>

                            <View style={{ flexDirection: 'column', width: '100%', marginStart: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>{appInfo_4}</Text>

                            </View>

                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.appInfoItem}
                        onPress={this._toggleModal}
                    >
                        <View style={[styles.itemContainer]}>

                            <View style={{ flexDirection: 'column', width: '100%', marginStart: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>Got it!</Text>

                            </View>

                        </View>

                    </TouchableOpacity>

                </View>
            </Modal>
        )
    }

    showUserName() {
        return (
            <Modal isVisible={this.state.isModalVisible}>
                <View style={styles.appInfoContainer}>


                    <View style={{ justifyContent: 'center' }}>
                        <Image
                            source={require('./male.png')}
                            style={{ width: 100, height: 100, marginBottom: 20, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                        >
                        </Image>
                    </View>

                    <TouchableOpacity
                        style={styles.appInfoItem}

                    >
                        <View style={styles.itemContainer}>

                            <View style={{ flexDirection: 'column', width: '100%', marginStart: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>{this.state.email}</Text>

                            </View>

                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.appInfoItem}

                    >
                        <View style={styles.itemContainer}>

                            <View style={{ flexDirection: 'column', width: '100%', marginStart: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>{this.state.displayName}</Text>

                            </View>

                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.appInfoItem}

                    >
                        <View style={styles.itemContainer}>

                            <View style={{ flexDirection: 'column', width: '100%', marginStart: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>{this.state.phoneNumber}</Text>

                            </View>

                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.appInfoItem}

                    >
                        <View style={styles.itemContainer}>

                            <View style={{ flexDirection: 'column', width: '100%', marginStart: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>{appInfo_4}</Text>

                            </View>

                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.appInfoItem}
                        onPress={this._toggleModal}
                    >
                        <View style={[styles.itemContainer]}>

                            <View style={{ flexDirection: 'column', width: '100%', marginStart: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textInfo}>Got it!</Text>

                            </View>

                        </View>

                    </TouchableOpacity>

                </View>
            </Modal>
        )
    }

    render() {

        const { currentUser } = firebase.auth()
        return (
            <View style={styles.container} >
                <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
                <View style={styles.mainContainer}>


                    <Image

                        source={require('./bg_three.png')}

                        style={{
                            height: 300,

                        }}>
                    </Image>

                    <View></View>

                    <View style={styles.settingsTitle}>


                        <Text style={{ fontSize: 28, fontFamily: 'Roboto-Medium', color: 'white' }}>Settings</Text>
                    </View>

                    {/* <View style={styles.helloTitle}>


                        <Image

                            source={require('./user.png')}

                        >
                        </Image>

                    </View> */}


                </View>

                <ScrollView>
                    <TouchableOpacity
                        style={styles.cardview}
                        onPress={this._toggleModal}
                    >
                        <View style={styles.itemContainer}>
                            <Image
                                source={require('./person.png')}
                                style={{ width: 30, height: 30 }}
                            >
                            </Image>
                            <View style={{ flexDirection: 'column', width: '80%', marginStart: 8 }}>
                                <Text style={styles.textReason}>Personal Info</Text>
                                <Text style={styles.textDescription}>Display Name, Phone Number, ....</Text>
                            </View>
                            <Image
                                source={require('./right_arrow.png')}
                                style={{ width: 30, height: 30, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                            >
                            </Image>
                        </View>

                    </TouchableOpacity>

                    {this.showUserName()}


                    <TouchableOpacity
                        style={styles.cardview}
                        onPress={() => { this.props.navigation.navigate('ChangeEmail') }}
                    >
                        <View style={styles.itemContainer}>
                            <Image
                                source={require('./email.png')}
                                style={{ width: 30, height: 30 }}
                            >
                            </Image>
                            <View style={{ flexDirection: 'column', width: '80%', marginStart: 8 }}>
                                <Text style={styles.textReason}>Email Address</Text>
                                <Text style={styles.textDescription}>{currentUser.email}</Text>
                            </View>
                            <Image
                                source={require('./right_arrow.png')}
                                style={{ width: 30, height: 30, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                            >
                            </Image>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.cardview}
                        onPress={() => { this.props.navigation.navigate('ChangePassword') }}
                    >
                        <View style={styles.itemContainer}>
                            <Image
                                source={require('./password.png')}
                                style={{ width: 30, height: 30 }}
                            >
                            </Image>
                            <View style={{ flexDirection: 'column', width: '80%', marginStart: 8 }}>
                                <Text style={styles.textReason}>Change Password</Text>
                                <Text style={styles.textDescription}>Last changed 7 days ago</Text>
                            </View>
                            <Image
                                source={require('./right_arrow.png')}
                                style={{ width: 30, height: 30, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                            >
                            </Image>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.cardview}
                        onPress={this._toggleModal}
                    >
                        <View style={styles.itemContainer}>
                            <Image
                                source={require('./info.png')}
                                style={{ width: 30, height: 30 }}
                            >
                            </Image>
                            <View style={{ flexDirection: 'column', width: '80%', marginStart: 8 }}>
                                <Text style={styles.textReason}>App Infomation</Text>

                            </View>
                            <Image
                                source={require('./right_arrow.png')}
                                style={{ width: 30, height: 30, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                            >
                            </Image>
                        </View>

                    </TouchableOpacity>


                    {this.showAppInfo()}

                    <TouchableOpacity
                        style={styles.cardview}
                        onPress={this.showSighOutAlert}
                    >
                        <View

                            style={styles.itemContainer}>
                            <Image
                                source={require('./logout.png')}
                                style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                            >
                            </Image>
                            <View style={{ flexDirection: 'column', width: '88%', marginStart: 13 }}>
                                <Text style={styles.textReason}>Log Out</Text>

                            </View>

                        </View>

                    </TouchableOpacity>

                </ScrollView>




            </View>
        );
    }
}

const styles = StyleSheet.create({


    mainContainer: {

        position: "relative",
        overflow: "visible",
        backgroundColor: '#F5F6F8',
        marginBottom: 15


    },

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5F6F8'


    },

    settingsTitle: {
        flexDirection: 'column',


        padding: 5,
        marginTop: 150,
        marginStart: 20,
        position: "absolute",

        width: '85%',
    },
    helloTitle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 25,
        padding: 5,
        marginTop: 140,
        marginStart: 140,
        position: "absolute",
        backgroundColor: 'white',
        width: 80, height: 80, borderRadius: 80 / 2
    },

    textInput: {
        fontSize: 16,
        height: 40
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 20
    },

    itemContainer: {
        margin: 10,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardview: {

        backgroundColor: '#F5F6F8',
        margin: 8,

        padding: 5,
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowRadius: 5,
        shadowColor: '#B372CD',
        shadowOpacity: 0.5,
        borderRadius: 5
    },
    textReason: {
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        color: 'gray'
    },
    textDescription: {
        fontSize: 15,
        fontFamily: 'Roboto-Light',
        color: 'gray'

    },

    appInfoContainer: {

        margin: 8,

        padding: 5,
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowRadius: 5,
        shadowColor: '#B372CD',
        shadowOpacity: 0.5,
        borderRadius: 5,
        flex: 1, marginVertical: 25, marginHorizontal: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInfo: {
        fontSize: 13,
        fontFamily: 'Roboto-Medium',
        color: 'gray'
    },
    appInfoItem: {
        backgroundColor: '#F5F6F8',
        margin: 8,

        padding: 7,
        marginHorizontal: 5,
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowRadius: 50 / 2,
        shadowColor: '#B372CD',
        shadowOpacity: 0.5,
        borderRadius: 50 / 2
    }

})

export default Home;