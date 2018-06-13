import {createStore, compose, applyMiddleware} from 'redux';
import reducers from '../reducers'
import thunk from 'redux-thunk';

export const store = createStore(
	reducers,
	{},
	compose(
		applyMiddleware(think)
	)
);