const
        express = require('express'),
        router = express.Router();


router.get('/', (req, res) => res.render('messages',
    {
        worktype: 'Дипломная работа',
        subject: 'Корпоративные скандалы как индикатор...',
        orderNumber: '1 010 601'

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
