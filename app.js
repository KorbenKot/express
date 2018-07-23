const
        express = require('express'),
        expressHbs = require('express-handlebars'),
        path = require('path'),
        app = express(),
        cabinetRouter = require('./cabinetRouter'),
        orderRouter = require('./orderRouter');

// HBS VIEW ENGINE
app.engine('handlebars', expressHbs({
    defaultLayout: 'main',
    extname: '.handlebars',
    partialsDir: path.join(__dirname, 'src/views/blocks'),
    layoutsDir: path.join(__dirname, 'src/views/layouts')
}));

app.set('view engine', '.handlebars');
app.set('views',path.join(__dirname,'src/views'));


/* HTML VIEW ENGINE */
/*
app.engine('html', require('ejs').renderFile);
app.set('views', './dest');
app.set('view engine', 'html');
*/

// STATIC
app.use('/static', express.static(path.join(__dirname, 'dest')));
app.use(express.static('dest/css'));
app.use(express.static('dest/js'));
app.use(express.static('src/img'));
app.use(express.static('src/svg/img'));
app.use(express.static('src/fonts'));

// ROUTES
app.use('/', cabinetRouter);
app.use('/order123', orderRouter);


// 404
app.use(function (req, res, next) {
    let error = new Error('Page not found');
    error.status = 404;
    next(error);
});

// PORT
app.listen(8080, () => console.log('My test app running on port 8080!'));
