const router = require('express').Router();

router.route('/')
  .get((req, res) => { res.send('USER'); });

module.exports = router;
