// require('babel');
var express = require('express');
var path = require('path');
var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true, parameterLimit:50000}));
var fs = require('fs');

//Allow cross Origin

app.all('*', function(req, res, next) {
    var url = req._parsedUrl.pathname
    var api = url.replace('/api/', '')
    fs.appendFileSync('api_calls.log', "########## API CALL ######### at "+ new Date().toLocaleString()+ "\r\n")
    fs.appendFileSync('api_calls.log', "ip " + req.connection.remoteAddress + "\r\n");
    fs.appendFileSync('api_calls.log', "Api name  " +  api + "\r\n");
    fs.appendFileSync('api_calls.log', "Method type  " + req.method + "\r\n");
    if(req.method == 'POST'){
        fs.appendFileSync('api_calls.log', "params  " + JSON.stringify(req.body) + "\r\n");
    } else {
        fs.appendFileSync('api_calls.log', "params  " + JSON.stringify(req.query) + "\r\n");
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, orgUID, sessionToken, orgID');
    next();
});

var api = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use (express.static(path.join(__dirname,'')));
// app.use (express.static(path.join(__dirname,'client')));


var publicPath = path.resolve(__dirname, 'client');

// We point to our static assets
app.use(express.static(publicPath));


app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
