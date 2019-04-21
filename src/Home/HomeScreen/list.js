import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, ListView, ActivityIndicator, Image } from 'react-native'
import firebase from 'react-native-firebase'
import { home_dong } from '../../constants/constants';
import CardView from 'react-native-cardview'
import { Dimensions } from "react-native";

const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
const ds1 = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var width = Dimensions.get('window').width; //full width
class List extends React.Component {
    _isMounted = false;
    constructor() {
        super();

        this.state = {
            cars: [],

            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            dataSource1: ds1.cloneWithRows(['row 1', 'row 2']),
            name: ''

        }
    }

    renderListReason = (param) => {
        switch (param) {
            case 'Restaurant':
                this.RESTAURANT();
                break;
            default: Alert.alert("NUMBER NOT FOUND");
        }
    }

    RESTAURANT = () => {
        return <Image
            style={{ width: 50, height: 50, justifyContent: 'flex-end' }}
            source={require('./Mastercard.png')}
        ></Image>

    }

    // componentDidUpdate() {
    //     var docRef = firebase.firestore().collection("User").doc("f3qytY21q3MH31obOJEP");
    //     docRef.get()

    //         .then((responseJSON) => {


    //             this.setState({
    //                 // cars: responseJSON.data().cars,
    //                 dataSource: ds.cloneWithRows(responseJSON.data().income)
    //             });

    //         }
    //         )
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

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
                        dataSource: ds.cloneWithRows(responseJSON.data().income),
                        dataSource1: ds1.cloneWithRows(responseJSON.data().expense),
                        name: responseJSON.data().displayName
                    });
                }



            }
            )
            .catch((error) => {
                console.error(error);
            });

    }

    render() {
        return (

            <View style={styles.container}>

                <ListView

                    enableEmptySections={true}
                    noScroll={true}
                    dataSource={this.state.dataSource1}
                    renderRow={(rowData) =>


                        <CardView
                            style={styles.cardview}
                            cardElevation={5}


                            cornerRadius={5}
                        >
                            <View style={{ flex: 1, flexDirection: 'column', margin: 5, backgroundColor: '#F5F6F8' }}>

                                <View
                                    style={{ flexDirection: 'row', marginEnd: 5 }}>
                                    <View style={{ width: '60%', alignItems: 'flex-start' }}>
                                        <Text style={styles.textReason}>{rowData.reason}</Text>
                                    </View>
                                    <View style={{ width: '40%', alignItems: 'flex-end' }}>
                                        <Text style={styles.textAmount}>{rowData.amount}</Text>
                                    </View>

                                </View>

                                <View
                                    style={{ flexDirection: 'row', marginEnd: 5 }}>
                                    <View style={styles.circleExpense}></View>

                                    <View style={{ flex: 1, flexDirection: 'row', marginStart: 5 }}>
                                        <View style={{ width: '60%', alignItems: 'flex-start' }}>
                                            <Text style={styles.textDescription}>{rowData.description}</Text>
                                        </View>


                                        <View style={{ width: '40%', alignItems: 'flex-end' }}>
                                            <Text style={styles.textDate}>{monthNames[rowData.month] + ' ' + rowData.day + ' ' + rowData.year}</Text>
                                        </View>
                                    </View>


                                </View>
                            </View>

                        </CardView>
                    }
                />


                <ListView
                    enableEmptySections={true}
                    noScroll={true}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>


                        <CardView
                            style={styles.cardview}
                            cardElevation={5}


                            cornerRadius={5}
                        >
                            <View style={{ flex: 1, flexDirection: 'column', margin: 5, }}>

                                <View
                                    style={{ flexDirection: 'row', marginEnd: 5 }}>
                                    <View style={{ width: '60%', alignItems: 'flex-start' }}>
                                        <Text style={styles.textReason}>{rowData.reason}</Text>
                                    </View>
                                    <View style={{ width: '40%', alignItems: 'flex-end' }}>
                                        <Text style={styles.textAmount}>{rowData.amount}</Text>
                                    </View>

                                </View>

                                <View
                                    style={{ flexDirection: 'row', marginEnd: 5 }}>
                                    <View style={styles.circle}></View>

                                    <View style={{ flex: 1, flexDirection: 'row', marginStart: 5 }}>
                                        <View style={{ width: '60%', alignItems: 'flex-start' }}>
                                            <Text style={styles.textDescription}>{rowData.description}</Text>
                                        </View>


                                        <View style={{ width: '40%', alignItems: 'flex-end' }}>
                                            <Text style={styles.textDate}>{monthNames[rowData.month] + ' ' + rowData.day + ' ' + rowData.year}</Text>
                                        </View>
                                    </View>


                                </View>
                            </View>

                        </CardView>
                    }
                />


            </View>
        )
    }
}
export default List

const styles = StyleSheet.create({
    circleExpense: {
        width: 8,
        height: 8,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: '#F05164',
        marginTop: 4
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: '#139794',
        marginTop: 4

    },
    container: {
        flex: 1,

        flexDirection: 'column',
        width: width
    },
    textLeft: {
        flex: 1,
        alignItems: 'flex-end',
        padding: 30,
        margin: 2,


        backgroundColor: '#d2f7f1'
    },
    textRight: {
        alignItems: 'flex-end',
        padding: 30,
        margin: 2,


        backgroundColor: '#d2f7f1',
        color: 'red',
    },
    textDong: {
        color: 'red',
        textDecorationLine: 'underline'
    },
    cardview: {
        flex: 1,
        backgroundColor: '#F5F6F8',
        margin: 10,
        marginStart: 15,
        marginEnd: 15,

        padding: 5,
    },
    textReason: {
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        color: 'gray'
    },
    textAmount: {
        fontSize: 21,
        fontFamily: 'Roboto-Bold',
        letterSpacing: 2,
        color: 'gray'
    },
    textDescription: {
        fontSize: 15,
        fontFamily: 'Roboto-Light',
        color: 'gray'

    },
    textDate: {
        fontSize: 13,
        fontFamily: 'Roboto-Light',
        color: 'gray'

    }
})