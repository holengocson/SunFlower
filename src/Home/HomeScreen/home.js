import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, Alert, StyleSheet, ScrollView, StatusBar, ActivityIndicator, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import List from './list'
import CardView from 'react-native-cardview'
import Charts from './charts'
import ActionButton from 'react-native-action-button';
import Financial from './financial'
import firebase from 'react-native-firebase';


const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);
class Home extends Component {

    _isMounted = false;

    constructor() {
        super(),
            this.signOut = this.signOut.bind(this),
            this.goToDetail = this.goToDetail.bind(this)
        this.state = ({

            loading: false,
            displayName: '',
            email: ''
        })
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
                        // cars: responseJSON.data().cars,

                        displayName: responseJSON.data().displayName,
                        email: responseJSON.data().email
                    });
                }



            }
            )
            .catch((error) => {
                console.error(error);
            });

    }



    // static navigationOptions = ({ navigation }) => ({
    //     headerStyle: {
    //         backgroundColor: '#00000000'

    //     },
    //     title: "Home",
    //     headerTintColor: 'white',
    //     headerRight: (

    //         <TouchableOpacity
    //             // style={Styles.headerButton}
    //             onPress={() => { }}>
    //             <Icon name="bars" size={20} color='white' />
    //         </TouchableOpacity>
    //     ),

    // })

    showLoading() {
        this.setState({ loading: true })
    }

    hideLoading() {
        this.setState({ loading: false })
    }


    // signOut(){
    //     this.showLoading()
    //     setInterval(() => {
    //         firebase.auth().signOut()

    //             this.props.navigation.navigate('SignIn')
    //       }, 3000);

    // }

    signOut = async () => {
        this.showLoading()

        try {

            await firebase.auth().signOut();
            this.props.navigation.navigate('SignIn');
        } catch (e) {
            this.hideLoading()
            console.log(e);
        }
    }

    goToDetail() {
        this.props.navigation.navigate('financedetail')
    }
    render() {
        return (

            <View
                style={styles.container}
            >
                <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />

                <View style={styles.mainContainer}>


                    <Image
                        // blurRadius={10}

                        source={require('./bg_three.png')}

                        style={{
                            height: 300,

                        }}
                    >


                    </Image>

                    <View style={styles.helloTitle}>
                        <Text style={styles.helloText}>{'Welcome, ' + this.state.displayName} </Text>
                        <Text style={{
                            color: 'white',
                            fontSize: 18,
                            fontFamily: 'Roboto-Regular'
                        }}>{this.state.email} </Text>
                    </View>

                    <CardView
                        style={styles.cardviewTitle}
                        cardElevation={10}


                        cornerRadius={15}
                    >

                        <ImageBackground
                            style={{ width: '100%' }}
                            source={require('./home-banner-background.jpg')}
                            imageStyle={{ borderRadius: 15 }}
                        >
                            <Text style={styles.textContentCard}>
                                Current Balance
                            </Text>



                            <Financial></Financial>

                            <Text style={styles.textContentCard}>
                                ---- ---- ---- 4225
                            </Text>

                            <View style={{ alignItems: "flex-end", flex: 1, marginEnd: 14 }}>
                                <Image
                                    style={{ width: 50, height: 50, justifyContent: 'flex-end' }}
                                    source={require('./Mastercard.png')}
                                >

                                </Image>
                            </View>


                        </ImageBackground>





                    </CardView>
                </View>


                <ScrollView style={{ marginTop: 90, backgroundColor: '#F5F6F8' }}>

                    {/* <CardView
                        style={styles.cardview}
                        cardElevation={10}

                        cornerRadius={5}>
                        
                    </CardView> */}

<Text
                        onPress={this.goToDetail}
                    >More ></Text>

                    <View style={{ flex: 1, flexDirection: 'row', marginStart: 3 }}>
                        <View style={{ width: '70%' }}>
                            <Text style={[styles.textContent]}>
                                Recent Transaction
                        </Text>
                        </View>

                        <View

                            style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image

                                style={{ width: 25, height: 25, justifyContent: 'flex-end' }}
                                source={require('./transaction.png')}
                            />
                        </View>

                    </View>

                    <List></List>

                    


                    <CardView
                        style={styles.cardview}
                        cardElevation={10}

                        cornerRadius={15}>
                        <Text style={styles.textContent}>
                            Charts
                        </Text>
                        <Charts></Charts>
                    </CardView>


                    <CardView
                        style={styles.cardviewSignOut}
                        cardElevation={10}

                        cornerRadius={15}>
                        <Text
                            onPress={this.signOut}
                            style={styles.textContentSignout}>
                            Sign Out
                        </Text>

                    </CardView>


                    <ActionButton

                        buttonColor="rgba(231,76,60,1)"
                        onPress={() => { this.props.navigation.navigate('AddNew') }}
                    />
                    {this.state.loading &&
                        <View style={styles.loading}>
                            <ActivityIndicator />
                        </View>
                    }


                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {

        position: "relative",
        overflow: "visible",
        backgroundColor: '#F5F6F8'


    },

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5F6F8'


    },
    textTitle: {
        color: 'blue',
        fontSize: 20,
    },
    textContent: {

        fontSize: 18,
        letterSpacing: 3,
        color: 'black',
        fontFamily: 'Roboto-Medium',
        margin: 10,
        padding: 5
    },

    textContentCard: {

        fontSize: 18,
        letterSpacing: 3,
        color: 'white',
        fontFamily: 'Roboto-Medium',
        margin: 10,
        padding: 5
    },

    helloTitle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 25,
        padding: 5,
        marginTop: 80,
        position: "absolute",

        width: '85%',
        // shadowOffset: {
        //     width: 0,
        //     height: 8
        // },
        // shadowRadius: 5,
        // shadowColor: '#B372CD',
        // shadowOpacity: 0.5

    },

    helloText: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'Roboto-Medium'
    },

    cardviewTitle: {

        justifyContent: 'center',
        margin: 25,
        padding: 5,
        marginTop: 150,
        position: "absolute",
        bottom: -100,
        width: '85%',
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowRadius: 5,
        shadowColor: '#B372CD',
        shadowOpacity: 0.5


    },

    avatar: {

        marginStart: 150,
        marginTop: 100,

        alignItems: 'flex-end',

        position: "absolute",

    },
    cardview: {
        flex: 1,
        backgroundColor: '#F5F6F8',
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

    cardviewSignOut: {
        flex: 1,
        backgroundColor: 'white',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,

    },
    textContentSignout: {
        fontSize: 18,
        letterSpacing: 3,
        color: 'red',
        fontFamily: 'Roboto-Regular',
        margin: 10,
        padding: 5
    }
})

export default Home;