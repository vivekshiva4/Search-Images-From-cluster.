import React, { PropTypes } from 'react'
import {
    Router,
    Route,
    IndexRoute
} from 'react-router'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import HomePage from './login/HomePage.jsx'

if(NODE_ENV == 'dev') {
    global.BASE_URL = 'http://127.0.0.1:8000'
    global.ADMIN_URL = 'http://127.0.0.1:3000'
}else if(NODE_ENV == 'production'){
    global.BASE_URL = 'https://'
    global.ADMIN_URL = 'https://'
}else {
    global.BASE_URL = 'http://'
    global.ADMIN_URL = 'http://'
}


ReactDOM.render((
    <Router history={browserHistory}>
        <div>
            <Route exact path="/" component={HomePage}/>
        </div>
    </Router>

), document.getElementById('app'))