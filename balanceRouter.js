const
    express = require('express'),
    router = express.Router();

router.get('/', (req, res) => res.render('balance'));

router.get('/pay_help', (req, res) => res.render('pay_help'));

router.get('/pay_history', (req, res) => res.render('pay_history'));

router.get('/pay_help', (req, res) => res.render('pay_help'));

router.get('/pay_out', (req, res) => res.render('pay_out'));

module.exports = router;