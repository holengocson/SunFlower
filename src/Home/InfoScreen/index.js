import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Home from './home';
import ChangePassword from './SettingsDetails/changepassword'
import ChangeEmail from './SettingsDetails/changeemail'

export default createSwitchNavigator({
    Home,
    ChangePassword,
    ChangeEmail
})