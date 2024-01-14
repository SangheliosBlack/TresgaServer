const Router = require('express');
const passport = require('passport');
const controller = require('../controllers/unidadesController');
const checkPermissions = require('../middlewares/checkPermissions');

const router = Router();

router.use(passport.authenticate('jwt',{session:false}));

router.get('',checkPermissions('read','all'),controller.getUnidades);
router.get('/:id',checkPermissions('read','all'),controller.getUnidadById);
router.delete('',checkPermissions('read','all'),controller.deleteUnidad);
router.post('',checkPermissions('read','all'),controller.createUnidad);
router.patch('',checkPermissions('read','all'),controller.updateUnidad);

module.exports = router;