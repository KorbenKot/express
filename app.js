const
        express = require('express'),
        expressHbs = require('express-handlebars'),
        path = require('path'),
        app = express(),
        ejs = require('ejs');

/* HANDLEBARS VIEW ENGINE */

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

app.use(express.static(__dirname + '/dest'));
app.use(express.static('dest/css'));
app.use(express.static('dest/js'));
app.use(express.static('src/img'));
app.use(express.static('src/svg/img'));
app.use(express.static('src/fonts'));

app.get('/', (req, res) => res.render('index',
    {
        pageTitle: 'Главная',
        username: 'Sasha'
    }
));
app.get('/about', (req, res) => res.render('about'));
app.get('/balance', (req, res) => res.render('balance'));
app.get('/cart', (req, res) => res.render('cart'));
app.get('/messages', (req, res) => res.render('messages'));
app.get('/user', (req, res) => res.render('user'));
app.get('/orders', (req, res) => res.render('orders',
    {
        pageTitle: 'Мои заказы'
    }
));
app.get('/orders-files', (req, res) => res.render('orders-files',
    {
        worktype: 'Дипломная работа',
        subject: 'Корпоративные скандалы как индикатор...',
        orderNumber: '1 010 601'

    }
));
app.get('/notifications', (req, res) => res.render('notifications'));

app.listen(8080, () => console.log('My test app running on port 8080!'));
