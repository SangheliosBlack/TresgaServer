"use strict";

const PuntosRecoleccion = require('../models/puntosRecoleccion');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const RequestUtil = require('../utils/requestUtils');

const controller = {
    getPuntosRecoleccion: catchAsync(async (req, res, next) => {
        try {
            const puntosRecoleccion = await PuntosRecoleccion.find();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', puntosRecoleccion, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    getPuntoRecoleccionById: catchAsync(async (req, res, next) => {
        try {
            const puntoRecoleccion = await PuntosRecoleccion.findById(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', puntoRecoleccion, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    createPuntoRecoleccion: catchAsync(async (req, res, next) => {
        try {
            const puntoRecoleccion = await PuntosRecoleccion.create(req.body);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', puntoRecoleccion, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    updatePuntoRecoleccion: catchAsync(async (req, res, next) => {
        try {
            const puntoRecoleccion = await PuntosRecoleccion.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(RequestUtil.prepareSingleResponse('success', puntoRecoleccion, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    deletePuntoRecoleccion: catchAsync(async (req, res, next) => {
        try {
            await PuntosRecoleccion.findByIdAndDelete(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { ok: true }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    })
};

module.exports = controller;
