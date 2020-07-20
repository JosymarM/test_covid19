const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const handleBars = require('express-handlebars');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({cookie: {maxAge: null}}));

// View engine setup
app.engine('handlebars', handleBars());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//MIDDLEWARES
app.use(morgan('dev'));
app.set('port', process.env.PORT || 8088);

//HANDLE PAGES
app.get('/', (req, res) => {
    res.render('home');
})


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})