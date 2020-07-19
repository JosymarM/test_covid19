const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const handleBars = require('express-handlebars').create();
const router = express.Router();
const app = express();

//SETTINGS
app.set('port', process.env.PORT || 8000);

//MIDDLEWARES
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({cookie: {maxAge: null}}));
app.engine('handlebars', handleBars.engine);
app.set('view engine', 'handlebars');
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));




// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})