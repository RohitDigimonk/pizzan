// import React from 'react';
// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import reducers from './store/reducers';

// const createStoreWithMiddleware = applyMiddleware()(createStore);

// AppRegistry.registerComponent(appName, () => 
// <Provider store={createStoreWithMiddleware(reducers)}>
// <App />
// </Provider>
// );


import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);