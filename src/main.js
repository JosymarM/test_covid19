const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const handleBars = require('express-handlebars').create();
const publicDir = require('path').join(__dirname, 'public');
const router = express.Router();
const app = express();

//
// Importing routes
const indexRoutes = require('./routes/index');

//SETTINGS
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({cookie: {maxAge: null}}));
app.engine('handlebars', handleBars.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: false}));
app.use(express.static(publicDir));
//routes
app.use('/', indexRoutes);



// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})