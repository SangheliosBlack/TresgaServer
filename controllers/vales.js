const catchAsync = require("../utils/catchAsync");
const Vales = require('../models/vales');

const controller = {
    getVales: catchAsync(async(req,res,next)=>{
        Vales.aggregate([
            {
              $match: {
                $or: [
                  {
                    producto: "DIESEL",
                    usado: false,
                    numero: { $gt: 17410 }
                  },
                  {
                    producto: "EFECTIVO",
                    usado: false,
                    $or: [
                      { importe: 500, numero: { $gt: 20900 } },
                      { importe: 1000, numero: { $gt: 34500 } },
                      { importe: 1500, numero: { $gt: 40368 } }
                    ]
                  },
                  {
                    producto: "FACTURA",
                    usado: false
                  }
                ]
              }
            },
            {
              $sort: {
                numero: 1
              }
            }
          ], function (err, vales) {
            if (!err) {
              const vales_diesel = vales.filter(vale => vale.producto === "DIESEL");
              const vales_efectivo_500 = vales.filter(vale => vale.producto === "EFECTIVO" && vale.importe === 500);
              const vales_efectivo_1000 = vales.filter(vale => vale.producto === "EFECTIVO" && vale.importe === 1000);
              const vales_efectivo_1500 = vales.filter(vale => vale.producto === "EFECTIVO" && vale.importe === 1500);
              const vales_facturas = vales.filter(vale => vale.producto === "FACTURA");
          
              return res.render("./pantallas/vales", {
                vales_diesel,
                vales_efectivo_500,
                vales_efectivo_1000,
                vales_efectivo_1500,
                week: week,
                vales_facturas
              });
            }
          });
          
    })
}

module.exports = controller