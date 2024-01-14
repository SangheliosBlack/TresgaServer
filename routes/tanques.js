const Router = require('express');
const passport = require('passport');
const controller = require('../controllers/tanquesController');
const checkPermissions = require('../middlewares/checkPermissions');

const router = new Router();

router.use(passport.authenticate('jwt',{session:false}));

router.get("/", checkPermissions('read','all'),controller.getAllTanques);
router.get("/:id",checkPermissions('read','all'), controller.getTanqueById);
router.delete("/:id", checkPermissions('read','all'),controller.deleteTanque);
router.post("/",checkPermissions('read','all'), controller.createNewTanque);
router.patch("/:id",checkPermissions('read','all'), controller.updateTanques);

module.exports = router