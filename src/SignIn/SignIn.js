import React from 'react'
import firebase from 'react-native-firebase'
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight, Image, Alert, TouchableOpacity, ImageBackground, StatusBar, ScrollView, ActivityIndicator } from 'react-native'
import { TextInputLayout } from 'rn-textinputlayout';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class Login extends React.Component {


  constructor() {
    super()
    this.createUser = this.createUser.bind(this)
    this.forgotPassword = this.forgotPassword.bind(this)
    this.state = ({
      email1: '',
      password1: '',
      loading: false
    })
  }



  state = { email: '', password: '', errorMessage: null }

  showLoading() {
    this.setState({ loading: true })
  }

  hideLoading() {
    this.setState({ loading: false })
  }


  createUser() {

    this.showLoading()
    const { email1, password1 } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email1, password1)
      .then(() => {
        this.props.navigation.navigate('Home')
      })
      .catch(error => {
        this.hideLoading()
        this.setState({ errorMessage: error.message })
      })


    // firebase.auth().createUserWithEmailAndPassword(email1, password1)
    //   .then(data => {
    //     //  console.log("User ID :- ", data.user.uid);
    //     Alert.alert(firebase.auth().currentUser.uid)
    //     firebase.firestore().collection("User").doc(data.user.uid)
    //       .set({
    //         xxx: "stuff",
    //         yyy: "stuff"
    //       })


    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

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

  forgotPassword() {

    // const {yourEmail} = this.state.email1

    // firebase.auth().sendPasswordResetEmail('holengocson142@gmail.com')
    //   .then(function (user) {
    //     Alert.alert('Please check your email...')
    //   }).catch(function (e) {
    //     console.log(e)
    //   })
    this.props.navigation.navigate('ForgotPasswordScreen')
  }

  render() {

    return (

      <View style={styles.container}>
        <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />

        {/* <ImageBackground
          // blurRadius={10}
          resizeMode='cover'
          source={require('./background.png')}
          // source={{ uri: 'http://cdn.iphonehacks.com/wp-content/uploads/2014/09/B5-576x1024.jpg' }}
          style={{ width: '100%', height: '100%' }}
        >
          
        </ImageBackground> */}

        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F6F8' }}>

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
            WELCOME
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
              value={this.state.email}
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
              value={this.state.password}
            />
          </View>

          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}


          <Text
            onPress={this.forgotPassword}
            style={{ justifyContent: 'flex-end', marginEnd: 30, marginTop: 15 }}>Forgot Password?</Text>


          <TouchableOpacity
            onPress={this.createUser}
            style={styles.button}>
            <Text style={styles.submitText}>SIGN IN</Text>
          </TouchableOpacity>
          {this.state.loading &&
            <View style={styles.loading}>
              <ActivityIndicator />
            </View>
          }

          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 45
          }}>

            <Text style={styles.textNotHaveAccount}> Don't have an account?</Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignUp')}
            >
              <Text style={styles.textSignUp}>Create new account</Text>
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