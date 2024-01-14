const Router = require('express');
const passport = require('passport');
const controller = require('../controllers/clientesController');
const checkPermissions = require('../middlewares/checkPermissions');


const router = new Router();

router.use(passport.authenticate('jwt',{session:false}));


router.get("/", checkPermissions('read','all'),controller.getClientes);
router.get("/:id",checkPermissions('read','all'), controller.getClienteById);
router.delete("/:id", checkPermissions('read','all'),controller.deleteCliente);
router.post("/",checkPermissions('read','all'), controller.createCliente);
router.patch("/:id",checkPermissions('read','all'), controller.updateCliente);


module.exports = router;