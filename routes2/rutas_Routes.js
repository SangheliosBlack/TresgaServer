
const express = require('express');
const passport = require('passport');
const RutasController = require('../controllers2/rutasController');
const checkPermissions = require('../middlewares/checkPermissions');
const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

/**
 * @swagger
 * tags:
 *   name: Rutas
 *   description: API endpoints for Rutas
 */

/**
 * @swagger
 * /rutas:
 *   get:
 *     summary: Retrieve a list of Rutas
 *     description: Retrieve a list of all Rutas
 *     tags: [Rutas]
 *     responses:
 *       200:
 *         description: A list of Rutas
 */
router.get("/", checkPermissions('read', 'all'), RutasController.getAllRutas);

/**
 * @swagger
 * /rutas:
 *   post:
 *     summary: Create a new Rutas
 *     description: Create a new Rutas
 *     tags: [Rutas]
 *     parameters: 
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: String
 *       - in: path
 *         name: cliente
 *         required: true
 *         schema:
 *           type: String
 *       - in: path
 *         name: origen
 *         required: true
 *         schema:
 *           type: String
 *       - in: path
 *         name: destino
 *         required: true
 *         schema:
 *           type: String
 *       - in: path
 *         name: producto
 *         required: true
 *         schema:
 *           type: String
 *       - in: path
 *         name: comision
 *         required: true
 *         schema:
 *           type: String
 *       - in: path
 *         name: unidad
 *         required: true
 *         schema:
 *           type: String
 *       - in: path
 *         name: remolque
 *         required: true
 *         schema:
 *           type: String
 *       - in: path
 *         name: precio
 *         required: true
 *         schema:
 *           type: String
 *       - in: path
 *         name: _id
 *         required: undefined
 *         schema:
 *           type: ObjectID
 *       - in: path
 *         name: updatedAt
 *         required: undefined
 *         schema:
 *           type: Date
 *       - in: path
 *         name: createdAt
 *         required: undefined
 *         schema:
 *           type: Date
 *       - in: path
 *         name: __v
 *         required: undefined
 *         schema:
 *           type: Number
 *     requestBody:
 *       description: Rutas data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rutas'
 *     responses:
 *       200:
 *         description: Rutas created successfully
 */
router.post("/", checkPermissions('read', 'all'), RutasController.createNewRutas);

/**
 * @swagger
 * /rutas/{id}:
 *   get:
 *     summary: Retrieve a single Rutas by ID
 *     description: Retrieve a single Rutas by ID
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single Rutas
 */
router.get("/:id", checkPermissions('read', 'all'), RutasController.getRutasById);

/**
 * @swagger
 * /rutas/{id}:
 *   patch:
 *     summary: Update a Rutas by ID
 *     description: Update a single Rutas by ID
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Rutas data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rutas'
 *     responses:
 *       200:
 *         description: Rutas updated successfully
 */
router.patch("/:id", checkPermissions('read', 'all'), RutasController.updateRutas);

/**
 * @swagger
 * /rutas/{id}:
 *   delete:
 *     summary: Delete a Rutas by ID
 *     description: Delete a single Rutas by ID
 *     tags: [Rutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rutas deleted successfully
 */
router.delete("/:id", checkPermissions('read', 'all'), RutasController.deleteRutas);

module.exports = router;
