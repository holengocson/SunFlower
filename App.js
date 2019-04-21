
import React from 'react'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createSwitchNavigator,createAppContainer } from 'react-navigation'
// import the different screens
import SignUp from './src/SignUp/SignUp'
import SignIn from './src/SignIn/SignIn'
import Loading from './src/Loading/Loading'
import Main from './src/Home/index'
import financedetail from './src/Home/details/index'
import ForgotPasswordScreen from './src/forgot/forgotpass'
import Home from './src/Home/HomeScreen/home'

const AppStack = createStackNavigator({ Home: SignUp, Other: Loading });
// const SignIN = createStackNavigator({ SignIn: SignIn });

export default createAppContainer(createSwitchNavigator(
  {
    // Loading: Loading,
    // SignUp: SignUp,
    // SignIn: SignIn
    // Main,
    // CPUHome,
    
    // AuthLoading: AuthLoadingScreen,
    Loading: Loading,
    Main: Main,
    SignIn: SignIn,
    financedetail: financedetail,
    SignUp: SignUp,
    ForgotPasswordScreen: ForgotPasswordScreen,
    Home: Home
  },
  {
    initialRouteName: 'Loading'
  }
  ));


