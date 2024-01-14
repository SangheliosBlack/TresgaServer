const Empleado = require('../models/empleados');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const RequestUtil = require('../utils/requestUtils');

const controller = {
    getEmpleados: catchAsync(async (req, res, next) => {
        try {
            const empleados = await Empleado.find();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', empleados, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    getEmpleadoById: catchAsync(async (req, res, next) => {
        try {
            const empleado = await Empleado.findById(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', empleado, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    createEmpleado: catchAsync(async (req, res, next) => {
        try {
            const newEmpleado = new Empleado(req.body);
            await newEmpleado.save();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { empleado: newEmpleado }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    updateEmpleado: catchAsync(async (req, res, next) => {
        try {
            const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(RequestUtil.prepareSingleResponse('success', empleado, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    deleteEmpleado: catchAsync(async (req, res, next) => {
        try {
            await Empleado.findByIdAndDelete(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { ok: true }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    })
};

module.exports = controller;
