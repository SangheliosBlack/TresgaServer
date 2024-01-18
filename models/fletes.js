const mongoose = require("mongoose");
const { Schema, model } = mongoose;

var Fletes_Schema = Schema({
    properties: {
        no_orden: {
            type: String,
            required: false
        },
        fecha: {
            type: String,
            required: false
        },
        nombre: {
            type: String,
            required: false
        },
        unidad: {
            type: String,
            required: true
        },
        tanque: {
            type: String,
            required: false
        },
        folio_diesel: {
            type: Number,
            required: false
        },
        folio_gastos: {
            type: Number,
            required: false
        },
        importe: {
            type: String,
            required: false
        },
        cliente: {
            type: String,
            required: false
        },
        origen: {
            type: String,
            required: false
        },
        destino: {
            type: String,
            required: false
        },
        producto: {
            type: String,
            required: true
        },
        escalas: {
            type: String,
            required: false
        },
        hora: {
            type: String,
            required: false
        },
        proveedor: {
            type: String,
            required: false
        },
        usuario: {
            type: String,
            required: false
        },
        ultima_edicion: {
            type: String,
            required: false
        },
        cancelado: {
            type: Boolean,
            required: false
        },
        fecha_flete: {
            type: String,
            required: false
        },
        editado: {
            type: Boolean,
            required: false
        },
        documento: {
            type: String,
            required: false
        },
        folio_gastos_check: {
            type: String,
            required: false
        },
        folio_diesel_check: {
            type: String,
            required: false
        },
        fecha_comodin: {
            type: String,
            required: false
        },
        metricos: {
            type: Boolean,
            required: false
        },
        folio_carta_porte_factura: {
            type: String,
            required: false
        }
    }
});

Fletes_Schema.statics.getFieldsInfo = function () {
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const Flete = model("fletes", Fletes_Schema);

module.exports = Flete;
