"use strict";

const Ruta = require('../models/rutas');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const RequestUtil = require('../utils/requestUtils');

const controller = {
    getRutas: catchAsync(async(req, res, next) => {
        try {
            const rutas = await Ruta.find();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', rutas, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    getRutaById: catchAsync(async(req, res, next) => {
        try {
            const ruta = await Ruta.findById(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', ruta, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    createRuta: catchAsync(async(req, res, next) => {
        try {
            const ruta = await Ruta.create(req.body);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', ruta, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    updateRuta: catchAsync(async(req, res, next) => {
        try {
            const ruta = await Ruta.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(RequestUtil.prepareSingleResponse('success', ruta, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    deleteRuta: catchAsync(async(req, res, next) => {
        try {
            await Ruta.findByIdAndDelete(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { ok: true }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    })
};

module.exports = controller;
