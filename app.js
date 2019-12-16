const express = require('express');
const swig = require('swig');
const app = express();
const sequelize = require('./src/config/mysql');
const session = require('express-session');
const passport = require('passport');

sequelize
  .authenticate()
  .then(() => {
    console.log('db connected successfully');
  })
  .catch(err => {
    console.log('db not connected', err);
  });
sequelize
  .sync()
  .then(() => {
    console.log('db synced success');
  })
  .catch(err => {
    console.log('sync trouble', err);
  });

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// setting up views, view engine and static files
app.engine('html', swig.renderFile);
app.set('views', __dirname + '/public/html');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

// session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
// routes
app.use('/', require('./src/routes/index'));
app.use('/visit', require('./src/routes/visit'));
app.use('/room', require('./src/routes/room'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
