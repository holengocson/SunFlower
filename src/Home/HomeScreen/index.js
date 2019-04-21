import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Home from './home';
import AddNew from './AddNew'

export default createSwitchNavigator({
    Home,
    AddNew,
   
})