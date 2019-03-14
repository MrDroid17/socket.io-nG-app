const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');

const app= express();
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Database connected '+ config.database);
})
mongoose.connection.on('error', (err) => {
    console.log('database connection error'+ err);
})

app.use(cors());
app.use(express.static(path.join(__dirname, './client/dist/client')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});
app.listen(8000, () => {
    console.log(`Server started at port 8000`);
});
