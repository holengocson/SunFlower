import React from 'react'
import firebase from 'react-native-firebase'
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight, Image, Alert, TouchableOpacity,ImageBackground,StatusBar } from 'react-native'


const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class Login extends React.Component {


  constructor() {
    super()
    this.createUser = this.createUser.bind(this)
    this.state = ({
      email1: '',
      password1: ''
    })
  }



  state = { email: '', password: '', errorMessage: null }



  createUser() {

    const { email1, password1 } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email1, password1)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))

    
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

  

  render() {
    
    return (
      
      <View style={styles.container}>
      <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />

        <ImageBackground 
        // blurRadius={10}
        resizeMode='cover'
        source={require('./background.png')}
        // source={{ uri: 'http://cdn.iphonehacks.com/wp-content/uploads/2014/09/B5-576x1024.jpg' }}
        style={{width: '100%', height: '100%'}}
        >
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

          <Text style={{ color: 'white', fontSize: 30, justifyContent: 'center', 
          // fontFamily: "Roboto-Italic" 
        }
          }
          >
            Welcome
          </Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor="white"
          onChangeText={email1 => this.setState({ email1 })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          placeholderTextColor="white"
          onChangeText={password1 => this.setState({ password1 })}
          value={this.state.password}

        />
        <TouchableOpacity
          style={styles.submit}
          onPress={this.createUser}
          underlayColor='#fff'>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

        

        {/* <Button title="Login" onPress={this.handleLogin} /> */}
        <Button
          title="Don't have an account? Sign Up"
          // onPress={() => this.props.navigation.navigate('SignUp')}
        />
        </View>
        </ImageBackground>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    
    justifyContent: 'center',
    marginTop: 8,
    paddingLeft: 15
  },
  submit: {
    width: 200,
    height: 45,
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: '#68a0cf',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  }
})