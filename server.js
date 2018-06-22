const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const http = require('http');

cors = require('cors');

// use it before all route definitions
const app = express();

//app.use(session({secret: 'ssshhhhherwin', cookie: { maxAge: 100000 }}));
app.use(session({
    secret: "ssshhhhherwin",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

//Cors
app.use(cors());
app.options('*', cors());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API file for interacting with api route
const api_um = require('./server/routes/api_um');
const api_master = require('./server/routes/api_master');
const api_thirdparty = require('./server/routes/api_thirdparty');

// API location
app.use('/api/um', api_um);
app.use('/api/master', api_master);
app.use('/api/thirdparty', api_thirdparty);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});



//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);
http.globalAgent.maxSockets = Infinity;
const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));