const Tanque = require('../models/tanques');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const RequestUtil = require('../utils/requestUtils');

const controller = {
    getAllTanques: catchAsync(async function(req, res, next) {
        try {
            const tanques = await Tanque.find();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', tanques, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    getTanqueById: catchAsync(async function(req, res, next) {
        try {
            const tanque = await Tanque.findById(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', tanque, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    updateTanques: catchAsync(async function(req, res, next) {
        try {
            const params = req.body;
            await Tanque.findByIdAndUpdate(params.id, { $set: { ...params } });
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { ok: true }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    deleteTanque: catchAsync(async function(req, res, next) {
        try {
            const { tanqueId } = req.body;
            await Tanque.findByIdAndDelete(tanqueId);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { ok: true }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    createNewTanque: catchAsync(async function(req, res, next) {
        try {
            const newTanque = new Tanque(req.body);
            await newTanque.save();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { tanque: newTanque }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    })
};

module.exports = controller;
