import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {MapView} from 'expo';

export default class MapScreen extends React.Component {
    state = {
        mapLoaded: false,
        region: {
            longtitude: -122,
            latitude: 37,
            longtitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }

    componentDidMount() {
        this.setState({mapLoaded: true});
    }

    onRegionChangeComplete = (region) => {
        this.setState({region});
    }

    render() {
        if (!this.state.mapLoaded) {
            return(
                <View style={mapScreenStyles.spinnerStyle}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }

        return(
            <View style={mapScreenStyles.containerStyle}>
                <MapView 
                    style={mapScreenStyles.mapViewStyle} 
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
            </View>
        );
    }
}

const mapScreenStyles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center'
    },
    containerStyle: {
        flex: 1
    },
    mapViewStyle: {
        flex: 1
    }
}