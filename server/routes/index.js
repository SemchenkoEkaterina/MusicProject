const Router = require('express');

const router = new Router();
const artistRouter = require('./artistRouter');
const trackRouter = require('./trackRouter');
const userRouter = require('./userRouter');

router.use('/artist', artistRouter);
router.use('/track', trackRouter);
router.use('/user', userRouter);

module.exports = router;