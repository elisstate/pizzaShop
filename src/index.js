import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './HomePage';
import { Provider } from "react-redux";
import configureStore from './store/index.js'
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = configureStore();

injectTapEventPlugin();

ReactDOM.render(
    <Provider store = {store}>
        <HomePage />
    </Provider>
    , document.getElementById('root')
);
