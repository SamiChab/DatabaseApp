import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createFilter, createBlacklistFilter } from 'redux-persist-transform-filter';
import { AsyncStorage } from 'react-native';

import reducers from './reducers';

// you want to remove some keys before you save
const saveSubsetBlacklistFilter = createBlacklistFilter(
	'settings',
	['welcomeFinished']
);

// you want to store only a subset of your state of reducer one
export const saveSubsetFilter = createFilter(
	'auth',
	['surname', 'email', 'userProfile']
  );

export const store = createStore(
	reducers,
	{}, //initial state
	compose(
		applyMiddleware(ReduxThunk),
		autoRehydrate()		
	)
); 

export const persistStoreConfig = {
	storage: AsyncStorage,
	transforms: [
		saveSubsetFilter,
		// saveSubsetBlacklistFilter
	],
	blacklist: ['authError']
	//whitelist: ['likedJobs']
}
