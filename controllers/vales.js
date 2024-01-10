const catchAsync = require("../utils/catchAsync");
const Vales = require('../models/vales');

const controller = {
    createNewValesList:catchAsync(async(req,res,next)=>{
      const params = req.body;

    
    var folio_inicial = +params.folio_inicial;
    const folio_final = +params.folio_final;
    const producto = params.producto;
    const monto = params.monto;

    var string_trim = monto.trim();
    var string_2 = string_trim.replace(",",".");
    var string_3 = string_2.replace(".","");
    var string_4 = string_3.replace("$","");
    
    var array_vales = [];
    var sub_modelo = {};
    var folio_cast = "";

    var tipo = false;
    if(producto == "DIESEL"){
      tipo = true;
      string_4 = " ";
    }else{
      +string_4
    }
    if(producto == 'FACTURA'){
      params.factura = true;
    }else{
      params.factura = false;
    }

    var fecha = moment().format('lll');

    for(var i = folio_inicial; i <= folio_final ;i++){      
      folio_cast = i.toString();
      if(producto == 'FACTURA'){
        if(params.razon == 'G'){
          folio_cast = 'G'+folio_cast;
        }else if(params.razon == 'F'){
          folio_cast = 'F'+folio_cast;
        }
      }
      sub_modelo ={
        "folio":folio_cast,
        "producto":producto,
        "importe":string_4,
        "numero":i,
        "usado":false,
        "tipo":tipo,
        "cancelado":false,
        "numero_rest":i,
        "factura":params.factura,
      }
      array_vales.push(sub_modelo);
    }

    var aprobado = true;
    var num = 0;

    console.log(array_vales);

    Vales.find(function(err,data){
      if(!err){
        array_vales.forEach(function(element,index,array){
          num ++;
          data.forEach(function(element2){
            if(element2.folio == element.folio){
              aprobado = false;
            }else{

            }
          });
          if(num == array.length ){
            if(aprobado){
              Vales.insertMany(array_vales,function(err,data){
                if(err){
                }else{
                 return res.status(200).json({response:"CREATE NEW LIST DONE",aprobado});
                }
              });
            }else{
              return res.status(200).json({response:"CREATE NEW LIST FAILURE",aprobado});
            }
          }
        });
      }
    });
    }),
    cancelVale: catchAsync(async(req,res,next)=>{
      Vales.findByIdAndUpdate(req.body.id,{cancelado:true}, function (err, data) {
        if (!err) {
          return res.redirect("/vales");
        }
      });
    }),
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