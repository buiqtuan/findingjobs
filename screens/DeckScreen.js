import React from 'react';
import {View, Text, Platform} from 'react-native';
import {connect} from 'react-redux';
import Swipe from '../components/Swipe'
import {MapView} from 'expo';
import {Card, Button, Icon} from 'react-native-elements';
import * as actions from '../actions'


class DeckScreen extends React.Component {
    static navigationOptions = {
        title: 'Jobs',
        tabBar: {
            icon: ({ tintColor }) => {
                return <Icon name="description" size={30} color={tintColor}/>;
            }
        }
    }

    renderCard(job) {
        const initialRegion = {
            longtitude: job.longtitude,
            latitude: job.latitude,
            latitudeDelta: 0.045,
            longtitudeDelta: 0.02
        }

        return (
            <Card title={job.jobtitle}>
                <View style={{height: 300}}>
                    <MapView 
                        scrollEnabled={false}
                        style={{flex:1}}
                        cacheEnabled={Platform.OS === 'android' ? true : false}
                        initialRegion={initialRegion}
                    />
                </View>
                <View style={styles.detailWrapper}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <Text>
                    {job.snippet.replace(/<b>/g,'').replace(/<\/b/g,'')}
                </Text>
            </Card>
        );
    }

    renderNoMoreCards = () => {
        return (
            <Card title="No More Jobs">
                <Button 
                    title="Back To Map"
                    large
                    icon={{name: 'my-location'}}
                    backgroundColor="#03A9F4"
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        );
    }

    render() {
        return(
            <View >
                <Swipe style={styles.screenWrapper}
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    keyProp="jobkey"
                    onSwipeRight={job => this.props.likeJob(job)}
                />
            </View>
        );
    }
}

const styles = {
    screenWrapper: {
        marginTop: 10
    },
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    }
}

function mapStateToProps({ jobs }) {
    return {jobs : jobs.results};
}

export default connect(mapStateToProps, actions)(DeckScreen);