import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput, Alert, TouchableHighlight, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import CardView from 'react-native-cardview'
import { Dropdown } from 'react-native-material-dropdown';

import firebase from 'react-native-firebase'
import DateTimePicker from 'react-native-modal-datetime-picker';
import {NavigationActions} from 'react-navigation'

var income = 0
var expense = 0



const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

class AddNew extends Component {

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

    constructor() {
        super();
        this.actionDone = this.actionDone.bind(this)
        this.onChangeText = this.onChangeText.bind(this)
        this.onChangeTextAmount = this.onChangeTextAmount.bind(this)
        this.onChangeTextDescription = this.onChangeTextDescription.bind(this)

        this.state = ({
            previousAmountExpense: 0,
            previousAmountIncome: 0,
            amount: 0,
            reason: '',
            description: '',
            goal: '',
            isDateTimePickerVisible: false,
            isTimePickerVisible: false,
            day: new Date().getDate().toString(),
            month: new Date().getMonth().toString(),
            year: new Date().getFullYear().toString(),

            hour: new Date().getHours().toString(),
            minute: new Date().getMinutes().toString(),
            isChosseCalendar: false,
            incomeMount: 0,
            expenseMount: 0,

           
        })
    }


    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _showTimePicker = () => this.setState({ isTimePickerVisible: true });

    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });


    _handleDatePicked = (date) => {


        this._hideDateTimePicker();

        this.setState({
            day: date.getDate().toString(),
            month: (date.getMonth() + 1).toString(),
            year: date.getFullYear().toString(),
            isChosseCalendar: true,
        })
    };


    _handleTimePicked = (date) => {
        this._hideTimePicker();

        this.setState({
        
            hour: date.getHours().toString(),
            minute: date.getMinutes().toString()
        })
    };


    _handleDateTimeNotPicked = (date) => {
        this.setState({
            day: new Date().getDate().toString
        })
    }


    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#05ADEE',

        },
        title: "Add",
        headerTintColor: 'white',
        // headerRight: (

        //     <TouchableOpacity
        //         style={Styles.headerButton}
        //         onPress={() => { this.actionDone}}>
        //         <Icon name="check" size={20} color='white' />
        //     </TouchableOpacity>
        // ),

    })

    componentDidMount(){
        var docRef = firebase.firestore().collection("User").doc("f3qytY21q3MH31obOJEP");
        docRef.get()

            .then((responseJSON) => {

                for (let index = 0; index < responseJSON.data().income.length; index++) {
                    if (responseJSON.data().income[index].amount != null) {
                        income += responseJSON.data().income[index].amount;
                    }


                }

                for (let index = 0; index < responseJSON.data().expense.length; index++) {
                    if (responseJSON.data().expense[index].amount != null) {
                        expense += responseJSON.data().expense[index].amount;
                    }


                }


                this.setState({
                    previousAmountIncome: income ,
                    previousAmountExpense: expense,
                    
                })
            }
            )
            .catch((error) => {
                console.error(error);
            });
    }
    

    actionDone() {
        const { reason,day, month, year, hours, minutes, amount, description } = this.state
       
        const {goBack} = this.props.navigation;
        const { goal } = this.state
        // Alert.alert(this.state.goal)

        var previousAmountIncome = this.state.previousAmountIncome
        var previousAmountExpense = this.state.previousAmountExpense



        if (this.state.goal == 'Expense') {
            firebase.firestore().collection("User")
                .doc('f3qytY21q3MH31obOJEP')
                .update(
                    {   
                        previousAmountExpense: previousAmountExpense + amount,
                     
                        expense: firebase.firestore.FieldValue.arrayUnion(
                            {   
                                
                                amount: amount,
                                reason: reason,
                                description: description,
                                day: day,
                                month : month,
                                year: year, 
                                hour: hours,
                                minute: minutes
                            
                            }
                        )
                    }
                ).then(() => this.props.navigation.navigate('financedetail'))
                .catch(error => Alert.alert(error))
                

        } else {
            firebase.firestore().collection("User")
                .doc('f3qytY21q3MH31obOJEP')
                .update(
                    {
                        previousAmountIncome: previousAmountIncome + amount,
                        income: firebase.firestore.FieldValue.arrayUnion(
                            {
                                amount: amount,
                                reason: reason,
                                description: description,
                                day: day,
                                month : month,
                                year: year, 
                                hour: hours,
                                minute: minutes
                            }
                        )
                    }
                ).then(() => this.props.navigation.navigate('financedetail'))
                .catch(error => Alert.alert(error))

        }
      
    }

    onChangeText(text) {
        this.setState({
            goal: text,
            
        })
    }

    onChangeTextAmount(text){
        this.setState({
            amount: parseInt(text),
        })
    }

    onChangeTextDescription(text) {
        this.setState({
            description: text
        })
    }


    render() {
        let data = [
            {
            value: 'Banana',
        }, {
            value: 'Mango',
        }, {
            value: 'Pear',
        },
        {
            value: 'Restaurant',
        },
    ];

        let dataGoal = [{
            value: 'Expense',
        },
        {
            value: 'Income'
        }]

        const { date, month, year } = this.state



        if (this.state.isChosseCalendar) {
            day1 = date
        } else {
            day1 = new Date().getDate().toString()
        }

        return (
            <View >
                <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />


                <CardView
                    style={styles.cardview}
                    cardElevation={10}

                    cornerRadius={5}>
                    <Text style={styles.textContent}>Amount</Text>


                    <TextInput
                        
                        keyboardType='numeric'
                        style={styles.textInput}
                        placeholder="0"
                        onChangeText={this.onChangeTextAmount}
                    />

                
                    
                </CardView>

                <CardView
                    style={styles.cardview}
                    cardElevation={10}

                    cornerRadius={5}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="question-circle" size={30} color='gray' style={{ margin: 5 }} />
                        <View style={{ flex: 1, marginBottom: 18, marginStart: 8 }}>
                            <Dropdown
                                onChangeText={(reason) => this.setState({ reason })}
                                label='Reason'
                                data={data}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="artstation" size={30} color='gray' style={{ margin: 5 }} />
                        <View style={{ flex: 1, marginTop: 5, marginStart: 8 }}>
                            <TextInput
                                style={{
                                    borderBottomColor: 'lightgray',
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    borderBottomWidth: 1,
                                }}
                                onChangeText={this.onChangeTextDescription}
                                placeholder="Description"
                            
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="directions" size={30} color='gray' style={{ margin: 5 }} />
                        <View style={{ flex: 1, marginBottom: 18, marginStart: 8 }}>
                            <Dropdown
                                onChangeText={this.onChangeText}
                                label='Goal'
                                data={dataGoal}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Icon name="calendar" size={30} color='gray' style={{ margin: 5 }} />

                        <View style={{ marginStart: 20, borderBottomColor: 'lightgray', borderBottomWidth: 1 }} >

                            <Text
                                onPress={this._showDateTimePicker}>
                                {this.state.day + ' / ' + this.state.month + ' / ' + this.state.year}
                            </Text>

                            <DateTimePicker
                                mode='date'
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}
                            />
                        </View>




                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Icon name="clock" size={30} color='gray' style={{ margin: 5 }} />


                        <View style={{ marginStart: 50, borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>

                            <Text
                                onPress={this._showTimePicker}>
                                {this.state.hour + ':' + this.state.minute}
                            </Text>


                            <DateTimePicker
                                mode='time'
                                isVisible={this.state.isTimePickerVisible}
                                onConfirm={this._handleTimePicked}
                                onCancel={this._hideTimePicker}
                            />
                        </View>



                    </View>






                </CardView>

                <TouchableHighlight
                    style={styles.submit}
                    onPress={this.actionDone}

                    underlayColor='#abdaec'>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="save" size={20} color='white' style={{ margin: 5 }} />
                        <Text style={styles.submitText}>Submit</Text>
                    </View>
                </TouchableHighlight>




            </View>
        );
    }
}

const styles = StyleSheet.create({


    container: {


        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        color: 'blue',
        fontSize: 20,
    },
    textContent: {

        fontSize: 25,

    },
    cardview: {

        backgroundColor: 'white',
        margin: 5,
        padding: 5,
    },
    submit: {
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: "#05ADEE",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold'
    },


    textInput: {
        height: 70,

        fontSize: 25,
        color: '#F05164',
        fontWeight: "bold",
        textAlign: 'right',
        padding: 8,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,

    },

})



export default AddNew;