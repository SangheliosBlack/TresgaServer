const Router = require('express');
const passport = require('passport');
const controller = require('../controllers/rutasController');
const checkPermissions = require('../middlewares/checkPermissions');

const router = new Router();


router.use(passport.authenticate('jwt',{session:false}));

router.get("/", checkPermissions('read','all'),controller.getRutas);
router.get("/:id",checkPermissions('read','all'), controller.getRutaById);
router.delete("/:id", checkPermissions('read','all'),controller.deleteRuta);
router.post("/",checkPermissions('read','all'), controller.createRuta);
router.patch("/:id",checkPermissions('read','all'), controller.updateRuta);


module.exports = router