"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SistemaSchema = Schema({
    folio_facturas: {
        type: String,
        required: true
    },
    folio: {
        type: String,
        required: true
    },
    folio_gastos: {
        type: String,
        required: true
    },
    folio_500: {
        type: String,
        required: true
    },
    folio_1000: {
        type: String,
        required: true
    },
    folio_1500: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Sistema", SistemaSchema);
