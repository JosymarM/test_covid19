const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const router = express.Router();
const app = express();



// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({cookie: {maxAge: null}}));

//FLASH MESSAGE MIDDLEWARE
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
}); 

app.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('contact', {layout : 'layout'});
    });

//HANDLE PAGES
router.get('/', async (req, res) => {
    res.render('contact');
});

//HANDLE CONTACT POST
app.post('/', async(req, res) => {
    if(req.body.nombres == '' || req.body.apellidos == '' || req.body.email == '' || req.body.fono == '') {
        req.session.message = {
            type: 'danger',
            intro: 'Campos vacíos',
            message: 'Por favor, ingrese la información solicitada'
        }
        res.redirect('/');
    }
});



module.exports = router;