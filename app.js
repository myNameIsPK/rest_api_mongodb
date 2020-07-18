if(process.env.NODE_ENV !== 'production'){ // if app not run in production env then use dotenv.
    require('dotenv').config(); // parse string in .env file into object.
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts'); //Layout support for ejs in express.

app.set('view engine','ejs'); // set express to use ejs in express settings.
app.set('views', __dirname+'/views'); // set path for views.
app.set('layout', 'layouts/layout.ejs'); // set layout of our website.
app.use(expressLayouts); // use express to use expressLayouts.
app.use(express.static('/public')); //set path for static files like style, img, css .

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true }).catch(err => 
    console.error('Initial connection to mongoDB is ERROR ;( '+err) // handle initial connection error.
);

const db = mongoose.connection;
db.on('error', err => console.error('ERROR after Initial connection ;( '+err) ); // handle error after initial connection. 
db.once('open', () => console.log('Connected to mongoDB :)')); // when connection success.

const indexRouter = require('./routes/index');
app.use(indexRouter); // use controller(routes).

app.listen(process.env.PORT || 3000,()=>{console.log("Listening to 3000");});