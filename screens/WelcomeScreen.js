import React from 'react';
import {View, Text} from 'react-native';

import Slides from '../components/Slides'

const SLIDES_DATA = [
    {text: 'Welcome to JobApp', color: '#03A9F4'},
    {text: 'Use this to get a job', color: '#009688'},
    {text: 'Set your location, then swipe away', color: '#03A9F4'}
]

export default class WelcomeScreen extends React.Component {
    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        return(
            <View>
                <Slides data={SLIDES_DATA} onComplete={this.onSlidesComplete}/>
            </View>
        );
    }
}