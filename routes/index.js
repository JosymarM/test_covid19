const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const router = express.Router();
const app = express();

//FLASH MESSAGE MIDDLEWARE
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
}); 

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: null
    },
    resave: true,
    saveUninitialized: true
}));

//HANDLE PAGES
router.get('/', async (req, res) => {
    res.render('contact');
});

//HANDLE CONTACT POST
router.post('/send', (req, res) => {
    console.log(req.body);
    if(req.body.nombres == '' || req.body.apellidos == '' || req.body.email == '' || req.body.fono == '' || req.body.mensaje == '') {
        req.session.message = {
            type: 'danger',
            intro: 'Campos vacíos',
            message: 'Por favor, ingrese la información solicitada'
        }        
    }
    
});

module.exports = router;