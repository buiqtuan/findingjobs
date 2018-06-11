import React from 'react';
import {View, Text} from 'react-native';

export default class ReviewScreen extends React.Component {
    static navigationOptions = {
        title: 'Review Jobs',
        header: () => {
            return {
                right: <Text>Right</Text>
            };
        }
    }

    render() {
        return(
            <View>
                <Text> ReviewScreen </Text>
            </View>
        );
    }
}