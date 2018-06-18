import React from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions'

class AuthScreen extends React.Component {
    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('map');
        }
    }

    componentDidMount() {
        this.props.facebookLogin();
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    render() {
        return(
            <View>
                <Text> AuthScreen </Text>
            </View>
        );
    }
}

function mapStatesToProps({auth}) {
    return {token: auth.token};
}

export default connect(mapStatesToProps, actions)(AuthScreen);