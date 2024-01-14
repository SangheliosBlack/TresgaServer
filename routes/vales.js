const Router = require('express');
const passport = require('passport');
const controller = require('../controllers/vales')
const checkPermission = require('../middlewares/checkPermissions');

const router = Router();

router.use(passport.authenticate('jwt', {session: false}));

router.get('',checkPermission('read','all'),controller.getVales);
router.patch('',checkPermission('read','all',controller.cancelVale));
router.post('',checkPermission('read','all'),controller.createNewValesList);

module.exports = router;