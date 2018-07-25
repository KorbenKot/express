const
        express = require('express'),
        expressHbs = require('express-handlebars'),
        path = require('path'),
        app = express(),
        cabinetRouter = require('./cabinetRouter'),
        orderRouter = require('./orderRouter');

// STATIC
app.use('/static', express.static(path.join(__dirname, 'dest')));
app.use(express.static(path.join(__dirname, 'dest/css')));
app.use(express.static(path.join(__dirname, 'dest/js')));
app.use(express.static(path.join(__dirname, 'src/img')));
app.use(express.static(path.join(__dirname, 'src/svg/img')));
app.use(express.static(path.join(__dirname, 'src/fonts')));

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

// ROUTES
app.use('/', cabinetRouter);
app.use('/order123', orderRouter);


// 404
/*app.use(function (req, res, next) {
    var error = new Error('Page not found');
    error.status = 404;
    next(error);
});*/

// Handle 404
app.use(function(req, res) {
    res.status(400);
    res.render('404.handlebars', {title: '404: File Not Found'});
});

// Handle 500
app.use(function(error, req, res, next) {
    res.status(500);
    res.render('500.handlebars',{title:'500: Internal Server Error', error: error});
});

// PORT
app.listen(8080, () => console.log('My test app running on port 8080!'));
