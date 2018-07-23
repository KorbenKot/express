const
        express = require('express'),
        router = express.Router();

router.get('/', (req, res) => res.render('index',
    {
        username: 'Sasha'
    }
));

router.get('/my-orders', (req, res) => res.render('my-orders',
    {
        pageTitle: 'Мои заказы',
        username: 'Sasha'
    }
));

router.get('/balance', (req, res) => res.render('balance',
    {
        pageTitle: 'Мой баланс',
        username: 'Sasha'
    }
));

router.get('/reviews', (req, res) => res.render('reviews',
    {
        pageTitle: 'Мои отзывы',
        username: 'Sasha'
    }
));

router.get('/settings', (req, res) => res.render('settings',
    {
        pageTitle: 'Мои заказы',
        username: 'Sasha'
    }
));

router.get('/addfriend', (req, res) => res.render('addfriend',
    {
        pageTitle: 'Добавить друга',
        username: 'Sasha'
    }
));

router.get('/shpory', (req, res) => res.render('shpory',
    {
        pageTitle: 'Шпоры',
        username: 'Sasha'
    }
));

module.exports = router;