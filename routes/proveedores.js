const Router = require('express');
const passport = require('passport');
const controller = require('../controllers/proveedoresController');
const checkPermissions = require('../middlewares/checkPermissions');


const router = new Router();

router.use(passport.authenticate('jwt',{session:false}));


router.get("/", checkPermissions('read','all'),controller.getProveedores);
router.get("/:id",checkPermissions('read','all'), controller.getProveedorById);
router.delete("/:id", checkPermissions('read','all'),controller.deleteProveedor);
router.post("/",checkPermissions('read','all'), controller.createProveedor);
router.patch("/:id",checkPermissions('read','all'), controller.updateProveedor);


module.exports = router;