import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert, ListView, ActivityIndicator } from 'react-native'
import firebase from 'react-native-firebase'
import { home_dong } from '../../constants/constants';

const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

class List extends React.Component {

    constructor() {
        super();
       
        this.state = {
            cars: [],
            
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
            
        }
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

    componentDidMount() {

        var docRef = firebase.firestore().collection("User").doc("f3qytY21q3MH31obOJEP");
            docRef.get()
    
                .then((responseJSON) => {
    
    
                    this.setState({
                        // cars: responseJSON.data().cars,
                        dataSource: ds.cloneWithRows(responseJSON.data().income)
                    });
    
                }
                )
                .catch((error) => {
                    console.error(error);
                });
        
    }

    render() {
        return (

            <View style={styles.MainContainer}>

                <ListView
                enableEmptySections = {true}
                noScroll={true}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>

                       <View
                        style = {{flex : 1, flexDirection: 'row'}}
                    
                            >
                        {/* <Text style={styles.textLeft}>
                         {rowData.reason}
            
                        </Text> */}
                        <Text style={styles.textRight}>
                         {rowData.reason + ' ' + home_dong}
                            
                        </Text>
                       </View>

                        
                        }
                />
            </View>
        )
    }
}
export default List

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d9f9b1',
        
    },
    textLeft: {
        flex:1,
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
    }
})