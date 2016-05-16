var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var wixparser = require('./wix-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var Particle = require('particle-api-js');
var PrticleEventEmitter = require('./ParticleEventEmitter');
var Config = require('./config');

var particle = new Particle();
var accessToken;

particle.login({username: Config.particle.username, password: Config.particle.password}).then(function particleLoginSuccess(data) {

    console.log("particleLoginSuccess: ");
    console.dir(data);

    accessToken = data.body.access_token;

    particle.getEventStream({
        deviceId: Config.particle.deviceId,
        name: 'gpsloc',
        auth: accessToken
    }).then(function (stream) {
        if (stream) {
            stream.on('event', function eventReceived(data) {
                if (data) {
                    console.log("Particle Event: " + data.data);
                    PrticleEventEmitter.ReceiveData(data.data);
                }
            });
        }
        else {
            debugger;
        }
    });
}, function particleLoginError(err) {
    console.error("particleLoginError: " + err);

});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function SetGlobalLocals(req, res, next){
    app.locals.googleAPIKey = Config.googleApiKey;
    next();
});

app.use(wixparser([], Config.wix.appSecretKey));
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
