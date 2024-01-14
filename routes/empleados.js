const Router = require('express');
const passport = require('passport');
const controller = require('../controllers/empleadosController');
const checkPermissions = require('../middlewares/checkPermissions');


const router = new Router();

router.use(passport.authenticate('jwt',{session:false}));


router.get("/", checkPermissions('read','all'),controller.getEmpleados);
router.get("/:id",checkPermissions('read','all'), controller.getEmpleadoById);
router.delete("/:id", checkPermissions('read','all'),controller.deleteEmpleado);
router.post("/",checkPermissions('read','all'), controller.createEmpleado);
router.patch("/:id",checkPermissions('read','all'), controller.updateEmpleado);


module.exports = router;