const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => res.render('index',
    {
        title: 'Test app',
        message: 'Express fw',
        item: [{
            message: 'Fuck you!'
        }]
    }
));

app.get('/about', (req, res) => res.render('about'));

app.listen(8080, () => console.log('My test app running on port 8080!'));
