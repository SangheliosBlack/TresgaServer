const Router = require('express');
const passport = require('passport');
const controller = require('../controllers/puntosDescarga');
const checkPermissions = require('../middlewares/checkPermissions');


const router = new Router();

router.use(passport.authenticate('jwt',{session:false}));


router.get("/", checkPermissions('read','all'),controller.getPuntosDescarga);
router.get("/:id",checkPermissions('read','all'), controller.getPuntoDescargaById);
router.delete("/:id", checkPermissions('read','all'),controller.deletePuntoDescarga);
router.post("/",checkPermissions('read','all'), controller.createPuntoDescarga);
router.patch("/:id",checkPermissions('read','all'), controller.updatePuntoDescarga);


module.exports = router;