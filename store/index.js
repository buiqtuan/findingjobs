import {createStore, compose, applyMiddleware} from 'redux';
import reducers from '../reducers'
import {thunk} from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
	persistedReducer,
	{},
	compose(
		applyMiddleware(thunk)
	)
);

persistStore(store, {storage: AsyncStorage, whitelist: ['likedJobs']});

export default store;