const express = require('express');
const logger = require('morgan');
const swig = require('swig');
const app = express();

const PORT = process.env.PORT || 3000;

// setting up views, view engine and static files
app.engine('html', swig.renderFile);
app.set('views', __dirname + '/public/html');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

// routes
app.use('/', require('./src/routes/index'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
