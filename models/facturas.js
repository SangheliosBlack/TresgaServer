"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Factura_Schema = Schema({
    folio: {
        type: Number,
        required: true
    },
    empresa: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    razon_social: {
        type: String,
        required: true
    },
    ln: {
        type: Number,
        required: true
    },
    fecha_limite: {
        type: String,
        required: true
    },
    importe: {
        type: Number,
        required: true
    },
    metodo_pago: {
        type: String,
        required: true
    },
    forma_pago: {
        type: String,
        required: true
    },
    cfdi: {
        type: String,
        required: true
    },
    rfc_emisor: {
        type: String,
        required: true
    },
    comprobante: {
        type: String,
        required: true
    },
    solicitante: {
        type: String,
        required: true
    },
    dest_insum: {
        type: String,
        required: true
    },
    categoria_insum: {
        type: String,
        required: true
    },
    detalles: {
        type: String,
        required: true
    },
    plazo_pago: {
        type: Number,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    edicion: {
        type: String,
        required: true
    },

    f: {
        type: Boolean,
        required: true
    },
    v: {
        type: Boolean,
        required: true
    },
    p: {
        type: Boolean,
        required: true
    },
    z: {
        type: Boolean,
        required: true
    },
    documento_1_FAC: {
        type: String,
        required: true
    },
    documento_2_SAT: {
        type: String,
        required: true
    },
    documento_3_COM_PAGO: {
        type: String,
        required: true
    },
    documento_4_RECIBO_ELEC: {
        type: String,
        required: true
    },
    documento_5_VERIFICACION: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("facturas", Factura_Schema);
