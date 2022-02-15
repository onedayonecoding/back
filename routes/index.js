const express = require('express');
const router = express.Router();
const departmentRouter = require('./department');
const userRouter = require('./user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/log-test', (req, res, next) => {
  logger.error('This message is error');
  logger.warn('This message is warn');
  logger.info('This message is info');
  logger.verbose('This message is verbose');
  logger.debug('This message is debug');
  logger.silly('This message is silly');

  res.send('log test');
});

router.use('/departments', departmentRouter);
router.use('/users', userRouter);

module.exports = router;
