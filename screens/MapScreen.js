import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {MapView} from 'expo';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';

import * as actions from '../actions';

class MapScreen extends React.Component {
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

    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
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
                <View style={mapScreenStyles.buttonContainer}>
                    <Button 
                        large
                        title="Search this area"
                        backgroundColor="#009688"
                        icon={{name:'search'}}
                        onPress={this.onButtonPress}
                    />
                </View>
            </View>
        );
    }
}

export default connect(null, actions)(MapScreen);

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
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    }
}