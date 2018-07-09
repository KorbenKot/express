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
app.use(express.static('dest/fonts'));

app.get('/', (req, res) => res.render('index',
    {
        title: 'Test express application',
        message: 'Express message',
        item: [{
            message: 'Item message'
        }]
    }
));

app.get('/about', (req, res) => res.render('about'));
app.get('/balance', (req, res) => res.render('balance'));
app.get('/cart', (req, res) => res.render('cart'));

app.listen(8080, () => console.log('My test app running on port 8080!'));