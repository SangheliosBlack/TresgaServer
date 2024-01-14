const Unidad = require('../models/unidad');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const RequestUtil = require('../utils/requestUtils');

const controller = {
    getUnidades: catchAsync(async (req, res, next) => {
        try {
            const unidades = await Unidad.find();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', unidades, 'data'));

        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    getUnidadById: catchAsync(async (req, res, next) => {
        try {
            const unidad = await Unidad.findById(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', unidad, 'data'));

        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    createUnidad: catchAsync(async (req, res, next) => {
        try {
            const newUnidad = new Unidad(req.body);
            await newUnidad.save();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { unidad: newUnidad }, 'data'));

        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    updateUnidad: catchAsync(async (req, res, next) => {
        try {
            const unidad = await Unidad.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(RequestUtil.prepareSingleResponse('success', unidad, 'data'));

        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    deleteUnidad: catchAsync(async (req, res, next) => {
        try {
            await Unidad.findByIdAndDelete(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { ok: true }, 'data'));

        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),
};

module.exports = controller;
