"use strict";

const Proveedor = require('../models/proveedores');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const RequestUtil = require('../utils/requestUtils');

const controller = {
    getProveedores: catchAsync(async (req, res, next) => {
        try {
            const proveedores = await Proveedor.find();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', proveedores, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    getProveedorById: catchAsync(async (req, res, next) => {
        try {
            const proveedor = await Proveedor.findById(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', proveedor, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    createProveedor: catchAsync(async (req, res, next) => {
        try {
            const newProveedor = new Proveedor(req.body);
            await newProveedor.save();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { proveedor: newProveedor }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    updateProveedor: catchAsync(async (req, res, next) => {
        try {
            const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(RequestUtil.prepareSingleResponse('success', proveedor, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    deleteProveedor: catchAsync(async (req, res, next) => {
        try {
            await Proveedor.findByIdAndDelete(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { ok: true }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    })
};

module.exports = controller;
