import React from 'react';
import ReactDOM from 'react-dom';

//引入antdUI库
import {DatePicker} from "antd";
import 'antd/dist/antd.css'
import {Router, hashHistory, Route, IndexRoute} from "react-router";

import './index.css';
import App from './components/App';
import SearchCity from "./components/SearchCity";
import Future from "./components/Future";

ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path='/' component={App}/>
            <Route path='/search/now/city' component={SearchCity}/>
            <Route path='/search/future/city' component={Future}/>


        </Router>
    ), document.getElementById('root')
);


