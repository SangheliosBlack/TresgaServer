const catchAsync = require("../utils/catchAsync");
const Vales = require('../models/vales');
const AppError = require('../utils/appError');
const RequestUtil = require('../utils/requestUtils');

const controller = {
  createNewValesList: catchAsync(async (req, res, next) => {
    try {
      const { folioFinal, folioInicial, producto,razon} = req.body;

      const numerosDeFolioAgregados = Array.from({ length: folioFinal - folioInicial + 1 }, (_, index) => folioInicial + index);

      const valesParams = await Vales.find({ folio: { $in: numerosDeFolioAgregados } });
      if (valesParams.length > 0) {
        return res.status(400).json(RequestUtil.prepareSingleResponse('error', { success: false }, 'Folios existentes'));
      }

      const list_vales = [];

      for (let i = folioInicial; i <= folioFinal; i++) {
        var newVale = new Vales(req.body);
        newVale.folio = producto === 'FACTURA' ? `${razon}${i}` : `${i}`;

        list_vales.push(newVale);
      }

      console.log(list_vales);

      //await Vales.insertMany(list_vales);

      res.status(200).json(RequestUtil.prepareSingleResponse('success', { success: true }, 'data'));
    } catch (error) {
      next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
    }
  }),

  cancelVale: catchAsync(async (req, res, next) => {
    try {
      const { valeId } = req.body;
      const valeActualizado = await Vales.actualizarVale(valeId);

      res.status(200).json(RequestUtil.prepareSingleResponse('success', valeActualizado, 'data'));
    } catch (error) {
      next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
    }
  }),

  getVales: catchAsync(async (req, res, next) => {
    try {
      const { producto, importe } = req.body;
      const vales = await Vales.buscarVales(producto, importe);

      res.status(200).json(RequestUtil.prepareSingleResponse('success', vales, 'data'));
    } catch (error) {
      next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
    }
  })
};

module.exports = controller;