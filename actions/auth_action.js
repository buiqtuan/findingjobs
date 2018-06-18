import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {  } from 'react-redux';

import {
	FACEBOOK_LOGIN_SUCCESS,
	FACEBOOK_LOGIN_FAIL
} from './types';

const FACEBOOK_APP_ID = '396639167520135';

export const facebookLogin = () => async dispatch => {
	let token = await AsyncStorage.getItem('fb_token');
	if (token) {
		//Dispatch an action
		dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
	} else {
		//start FB login process
		doFacebookLogin(dispatch);
	}
}

const doFacebookLogin = async dispatch => {
	let { token, type } = Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
		permissions: ['public_profile']
	});

	if (type === 'cancel') {
		return dispatch({type: FACEBOOK_LOGIN_FAIL});
	}

	await AsyncStorage.setItem('fb_token', token);
	dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
	
};