import React from 'react';
import {View, Text, Platform, ScrollView, Linking} from 'react-native';
import {Button, Card, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {MapView} from 'expo';

class ReviewScreen extends React.Component {
    static navigationOptions = {
        title: 'Review Jobs',
        tabBar: {
            icon: ({ tintColor }) => {
                return <Icon name="favorite" size={30} color={tintColor}/>;
            }
        },
        header: ({ navigate }) => {
            return {
                right: (<Button 
                            title="Settings" 
                            onPress={() => navigate('setting')}
                            backgroundColor="rgba(0,0,0,0)"
                            color="rgba(0,122,255,1)"
                        />),
                style: {
                    marginTop: Platform.OS === 'android' ? 24 : 0
                }
            };
        }
    }

    renderLikesJobs() {
        return this.props.likedJobs.map((job) => {
            const { company, formattedRelativeTime, url, longtitude, latitude, jobtitle, jobkey} = job;
            const initialRegion = {
                longtitude,
                latitude,
                latitudeDelta: 0.045,
                longtitudeDelta: 0.02
            };

            return (
                <Card title={jobtitle} key={jobkey}>
                    <MapView 
                        style={styles.mapviewStyle}
                        cacheEnabled={Platform.OS === 'android' ? true : false}
                        scrollEnabled={false}
                        initialRegion={initialRegion}
                    />

                    <View style={styles.singleJobViewWrapper}>
                        <View>
                            <Text style={styles.textStyle}>{company}</Text>
                            <Text style={styles.textStyle}>{formattedRelativeTime}</Text>
                        </View>
                    </View>

                    <Button
                        title="Apply Now!"
                        backgroundColor="#03A9F4"
                        onPress={() => Linking.openURL(url)}
                    />
                </Card>
            );
        });
    }

    render() {
        return(
            <ScrollView>
                {this.renderLikesJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    singleJobViewWrapper: {
        height: 200
    },
    detailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textStyle: {
        fontStyle: 'italic'
    },
    mapviewStyle: {
        flex: 1
    }
}

function mapStateToProps(state) {
    return {
        likedJobs: state.likedJobs
    };
}

export default connect(mapStateToProps)(ReviewScreen);