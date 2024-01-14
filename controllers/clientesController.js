"use strict";

const Cliente = require('../models/clientes');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const RequestUtil = require('../utils/requestUtils');

const controller = {
    getClientes: catchAsync(async (req, res, next) => {
        try {
            const clientes = await Cliente.find();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', clientes, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    getClienteById: catchAsync(async (req, res, next) => {
        try {
            const cliente = await Cliente.findById(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', cliente, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    createCliente: catchAsync(async (req, res, next) => {
        try {
            const newCliente = new Cliente(req.body);
            await newCliente.save();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { cliente: newCliente }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    updateCliente: catchAsync(async (req, res, next) => {
        try {
            const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(RequestUtil.prepareSingleResponse('success', cliente, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    deleteCliente: catchAsync(async (req, res, next) => {
        try {
            await Cliente.findByIdAndDelete(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { ok: true }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    })
};

module.exports = controller;
