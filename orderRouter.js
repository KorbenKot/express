var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// router.use('/static', express.static(path.join(__dirname, 'dest')));


router.get('/', (req, res) => res.render('messages',
    {
        worktype: 'Дипломная работа',
        subject: 'Корпоративные скандалы как индикатор...',
        orderNumber: '1 010 601',
        user: 'Ишь Какое Длинное Имя Выбрал',
        userType: 'президент',
    }
));

router.get('/files', (req, res) => res.render('files',
    {
        worktype: 'Дипломная работа',
        subject: 'Корпоративные скандалы как индикатор...',
        orderNumber: '1 010 601'

    }
));

router.get('/details', (req, res) => res.render('details',
    {
        worktype: 'Дипломная работа',
        subject: 'Корпоративные скандалы как индикатор...',
        orderNumber: '1 010 601'

    }
));

module.exports = router;
