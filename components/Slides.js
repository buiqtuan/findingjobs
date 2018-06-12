import React from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends React.Component {
    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return(
                <Button
                    title="Onwards!"
                    raised
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
                />
            );
        }
    }

    renderSlides() {
        return this.props.data.map((slide,id) => {
            return (
                <View key={id} style={[styles.slideStyle, {backgroundColor: slide.color}]}>
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {this.renderLastSlide(index)}
                </View>
            );
        })
    }


    render() {
        return (
            <ScrollView
                horizontal
                style={{flex : 1}}
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    textStyle: {
        fontSize :30,
        color: 'white'
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
        marginTop: 15

    }
}