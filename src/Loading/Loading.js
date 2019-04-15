import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native'


export default class Loading extends React.Component {
//   componentDidMount() {
//     firebase.auth().onAuthStateChanged(user => {
//       this.props.navigation.navigate(user ? 'Login' : 'Login')
//     })
//   }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
        resizeMode='cover'
        source={require('./background_notblur.jpg')}
        // source={{ uri: 'http://cdn.iphonehacks.com/wp-content/uploads/2014/09/B5-576x1024.jpg' }}
        style={{width: '100%', height: '100%'}}>
          
          <View style = {styles.containerCenter}>
              <Text style = {styles.textTitle}>give and  take</Text>
              <Text style = {styles.textTitle2}>give and  take</Text>
          </View>

        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTitle: {
    justifyContent: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  textTitle2: {
    justifyContent: 'center',
    color: 'orange',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: "Roboto-Italic",
  }
})
