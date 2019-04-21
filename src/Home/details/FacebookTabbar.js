import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class FacebookTabBar extends React.Component {
  icons = [];

  constructor(props) {
    super(props);
   
  }

  componentDidMount() {
   
  }

  
  render() {
    return <View style={styles.tab}>

    </View>;
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  
});

export default FacebookTabBar;
