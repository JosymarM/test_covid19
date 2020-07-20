const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars').create()
const app = express()


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser('secret'))
app.use(session({cookie: {maxAge: null}}))
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

//MIDDLEWARES
app.use(morgan('dev'));
app.set('port', process.env.PORT || 8088)

//HANDLE PAGES
app.get('/', (req, res) => {
    res.render('home')
})


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})