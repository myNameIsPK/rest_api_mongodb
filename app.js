if (process.env.NODE_ENV !== 'production') { // if app not run in production env then use dotenv.
    require('dotenv').config(); // parse string in .env file into object.
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts'); //Layout support for ejs in express.
const bodyParser = require('body-parser'); //Middleware for express to easily parse body from post request.
const methodOverride = require('method-override'); // html form can use method DELETE and PUT.

app.set('view engine', 'ejs'); // set express to use ejs in express settings.
app.set('views', __dirname + '/views'); // set path for views.
app.set('layout', 'layouts/layout.ejs'); // set layout of our website.
app.use(expressLayouts); // set express to use expressLayouts.
app.use(express.static('/public')); //set path for static files like style, img, css .
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false })); //set express to parse body form URL-encode. 
app.use(methodOverride('_method')); // query <form action = '/any?_method=DELETE/PUT >

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbUser:bnyQzJNmSUR9DVSd@cluster0.r8pua.mongodb.net/dbUser?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch(err =>
    console.error('Initial connection to mongoDB is ERROR ;( ' + err) // handle initial connection error.
);

const db = mongoose.connection;
db.on('error', err => console.error('ERROR after Initial connection ;( ' + err)); // handle error after initial connection. 
db.once('open', () => console.log('Connected to mongoDB :)')); // when connection success.

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
app.use('/', indexRouter); // use controller(routes).
app.use('/todos', todosRouter);

app.listen(process.env.PORT || 3000, () => { console.log("Listening to 3000"); });