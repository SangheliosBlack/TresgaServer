const Rutas = require('../models/rutas');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const RequestUtil = require('../utils/requestUtils');

const RutasController = {
    getAllRutas: catchAsync(async (req, res, next) => {
        try {
            const rutas = await Rutas.find();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', rutas, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    getRutasById: catchAsync(async (req, res, next) => {
        try {
            const rutas = await Rutas.findById(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', rutas, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    createNewRutas: catchAsync(async (req, res, next) => {
        try {
            const newRutas = new Rutas(req.body);
            await newRutas.save();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { rutas: newRutas }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    updateRutas: catchAsync(async (req, res, next) => {
        try {
            const rutas = await Rutas.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(RequestUtil.prepareSingleResponse('success', rutas, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    deleteRutas: catchAsync(async (req, res, next) => {
        try {
            await Rutas.findByIdAndDelete(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { ok: true }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    })
};

module.exports = RutasController;
