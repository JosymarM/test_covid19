const path = require('path');
const publicDir = require('path').join(__dirname, 'public');
const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const app = express();

// Importing routes
const indexRoutes = require('./routes/index');

// View engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: '/views/layouts/'}));
app.set('view engine', 'hbs');
app.locals.layout = false

//
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(publicDir));

app.use('/', indexRoutes);

//SERVER
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
