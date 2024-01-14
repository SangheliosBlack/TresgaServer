const Router = require('express');
const passport = require('passport');
const controller = require('../controllers/puntosRecoleccion');
const checkPermissions = require('../middlewares/checkPermissions');


const router = new Router();

router.use(passport.authenticate('jwt',{session:false}));


router.get("/", checkPermissions('read','all'),controller.getPuntosRecoleccion);
router.get("/:id",checkPermissions('read','all'), controller.getPuntoRecoleccionById);
router.delete("/:id", checkPermissions('read','all'),controller.deletePuntoRecoleccion);
router.post("/",checkPermissions('read','all'), controller.createPuntoRecoleccion);
router.patch("/:id",checkPermissions('read','all'), controller.updatePuntoRecoleccion);


module.exports = router;