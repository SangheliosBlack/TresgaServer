const Router = require('express ');
const passport = require('passport');
const controller = require('../controllers/vales')
const checkPermission = require('../middlewares/checkPermissions');

const router = Router();

router.use(passport.authenticate('jwt', {session: false}));

router.get('vales',checkPermission('read','all'),controller.getVales);

module.exports = router;