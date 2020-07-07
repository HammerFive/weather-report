import React from 'react';
import ReactDOM from 'react-dom';

//引入antdUI库
import {DatePicker} from "antd";
import 'antd/dist/antd.css'

import './index.css';
import App from './components/App';

import {Router, hashHistory,Route ,IndexRoute} from "react-router";
import SearchCity from "./components/SearchCity";


ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <Route path='/search' component={SearchCity}/>
            </Route>
        </Router>
    ),document.getElementById('root')
);


