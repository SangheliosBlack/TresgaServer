"use strict";

const PuntosDescarga = require('../models/puntosDescarga');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const RequestUtil = require('../utils/requestUtils');

const controller = {
    getPuntosDescarga: catchAsync(async (req, res, next) => {
        try {
            const puntosDescarga = await PuntosDescarga.find();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', puntosDescarga, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    getPuntoDescargaById: catchAsync(async (req, res, next) => {
        try {
            const puntoDescarga = await PuntosDescarga.findById(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', puntoDescarga, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    createPuntoDescarga: catchAsync(async (req, res, next) => {
        try {
            const nuevoPuntoDescarga = new PuntosDescarga(req.body);
            await nuevoPuntoDescarga.save();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { puntoDescarga: nuevoPuntoDescarga }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    updatePuntoDescarga: catchAsync(async (req, res, next) => {
        try {
            const puntoDescarga = await PuntosDescarga.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(RequestUtil.prepareSingleResponse('success', puntoDescarga, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    deletePuntoDescarga: catchAsync(async (req, res, next) => {
        try {
            const { puntoDescargaId } = req.body;
            await PuntosDescarga.findByIdAndDelete(puntoDescargaId);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { ok: true }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    })
};

module.exports = controller;
