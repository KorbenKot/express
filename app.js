const
        express = require('express'),
        expressHbs = require('express-handlebars'),
        path = require('path'),
        app = express();

app.engine('handlebars', expressHbs({
    defaultLayout: 'main',
    extname: '.handlebars',
    partialsDir: path.join(__dirname, 'views/blocks'),
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', '.handlebars');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('dest/css'));
app.use(express.static('dest/js'));
app.use(express.static('dest/img'));
app.use(express.static('dest/fonts'));

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
app.get('/orders', (req, res) => res.render('orders',
    {
        pageTitle: 'Мои заказы'
    }
));
app.get('/notifications', (req, res) => res.render('notifications'));
app.get('/user-menu', (req, res) => res.render('user-menu'));

app.listen(8080, () => console.log('My test app running on port 8080!'));
