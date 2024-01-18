const mongoose = require("mongoose");
const { Schema, model } = mongoose;
var Sistema_Schema = Schema({
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

Sistema_Schema.statics.getFieldsInfo = function () {
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const Sistema = model("sistema", Sistema_Schema);

module.exports = Sistema;
