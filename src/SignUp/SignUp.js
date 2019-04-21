import React from 'react'
import firebase from 'react-native-firebase'
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight, Image, Alert, TouchableOpacity, ImageBackground, StatusBar } from 'react-native'
import { TextInputLayout } from 'rn-textinputlayout';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class SignUp extends React.Component {


  constructor() {
    super()
    this.createUser = this.createUser.bind(this)
    this.state = ({
      email1: '',
      password1: '',
      displayName: '',
      phoneNumber: ''
    })
  }



  state = { email: '', password: '', errorMessage: null }



  createUser() {

    const { email1, password1, displayName, phoneNumber } = this.state;

    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email1, password1)
    //   .then(() => this.props.navigation.navigate('Main'))
    //   .catch(error => this.setState({ errorMessage: error.message }))


    firebase.auth().createUserWithEmailAndPassword(email1, password1)
      .then(data => {
        //  console.log("User ID :- ", data.user.uid);
        // Alert.alert(firebase.auth().currentUser.uid)
        firebase.firestore().collection("User").doc(data.user.uid)
          .set({
            // xxx: "stuff",
            // yyy: "stuff"
            email: email1,
            password: password1,
            displayName: displayName,
            phoneNumber: phoneNumber,
            expense: [],
            income: []
          })
          .then(() => this.props.navigation.navigate('Main'))


      })
      .catch(error => {
        console.log(error);
      });

  }


  // handleLogin = () => {
  //   const { navigate } = this.props.navigation;
  //   const { email, password } = this.state

  //   var docRef = firebase.firestore().collection("User").doc("f3qytY21q3MH31obOJEP");
  //   docRef.get().then(function (doc) {

  //     if (doc.exists) {
  //       // Alert.alert("Document data:", doc.doc('seCMu7Y2Wu7Kg3LIli1p'));
  //       // Alert.alert("Document data:", JSON.stringify(doc.data().outmoney[0]));
  //       if (email == doc.data().email) {

  //         navigate('Main');


  //       } else {
  //         Alert.alert("sai roo");
  //       }
  //     } else {

  //       Alert.alert("No such document!");
  //     }
  //   })






  //   // if (email == '' || password == '') {


  //   // }
  // }



  render() {

    return (

      <View style={styles.container}>
        <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />



        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F6F8' }}>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <Image
              source={require('./icon.png')}
              style={{ width: 150, height: 150 }}></Image>
            {/* <Text style={{
              color: '#666465', fontSize: 20, justifyContent: 'center', letterSpacing: 5, marginEnd: 10,
              fontFamily: "Roboto-Medium"
            }}>SOCIAL-VUE</Text> */}
          </View>

          <Text style={{
            color: '#BFC0C2', fontSize: 25, justifyContent: 'center', marginBottom: 30, letterSpacing: 8, marginTop: 20,
            fontFamily: "Roboto-Light"
          }}>
            Register
          </Text>

          <View style={{
            width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: '#C6C7C9',
            borderWidth: 0.5,
          }}>
            <Image
              source={require('./email.png')}
              style={{ width: 40, height: 40 }}></Image>
            <TextInput
              style={styles.textInput}
              placeholder={'Email'}

              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor='#666465'

              onChangeText={email1 => this.setState({ email1 })}
              value={this.state.email1}
            />
          </View>

          <View style={{
            width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: '#C6C7C9',
            borderWidth: 0.5,
          }}>
            <Image
              source={require('./password.png')}
              style={{ width: 40, height: 40 }}></Image>
            <TextInput
              secureTextEntry
              style={styles.textInput}
              placeholder={'Password'}

              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor='#666465'

              onChangeText={password1 => this.setState({ password1 })}
              value={this.state.password1}
            />
          </View>

          <View style={{
            width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: '#C6C7C9',
            borderWidth: 0.5,
          }}>
            <Image
              source={require('./user.png')}
              style={{ width: 40, height: 40 }}></Image>
            <TextInput
            
              style={styles.textInput}
              placeholder={'Username'}

              autoCapitalize="none"
              placeholder="Username"
              placeholderTextColor='#666465'

              onChangeText={displayName => this.setState({ displayName })}
              value={this.state.displayName}
            />
          </View>

          <View style={{
            width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: '#C6C7C9',
            borderWidth: 0.5,
          }}>
            <Image
              source={require('./phone.png')}
              style={{ width: 40, height: 40 }}></Image>
            <TextInput
              
              style={styles.textInput}
              placeholder={'Phone Number'}

              autoCapitalize="none"
              placeholder="Phone Number"
              placeholderTextColor='#666465'

              onChangeText={phoneNumber => this.setState({ phoneNumber })}
              value={this.state.phoneNumber}
            />
          </View>






          <TouchableOpacity
            onPress={this.createUser}
            style={styles.button}>
            <Text style={styles.submitText}>Register</Text>
          </TouchableOpacity>

          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 45
          }}>

            <Text style={styles.textNotHaveAccount}> You have an account?</Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignIn')}
            >
              <Text style={styles.textSignUp}>Sign In</Text>
            </TouchableOpacity>

          </View>



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
    color: '#666465',
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

    color: '#666465',

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

  }, submitText: {
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
  }

})