import React from 'react';
import {View, Text} from 'react-native';
import {MapView} from 'expo';

export default class MapScreen extends React.Component {
    render() {
        return(
            <View style={mapScreenStyles.containerStyle}>
                <MapView style={mapScreenStyles.mapViewStyle}/>
            </View>
        );
    }
}

const mapScreenStyles = {
    containerStyle: {
        flex: 1
    },
    mapViewStyle: {
        flex: 1
    }
}