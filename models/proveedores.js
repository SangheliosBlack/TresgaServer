const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Proveedores_Schema = Schema({
    nombre: {
        type: String,
        required: false
    },
    rfc: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: false
    },
    contacto: {
        type: String,
        required: false
    },
    correo: {
        type: String,
        required: false
    },
    banco: {
        type: String,
        required: false
    },
    clabe_inter: {
        type: String,
        required: false
    },
    dom_1: {
        type: String,
        required: false
    },
    plazo: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
});

Proveedores_Schema.statics.getFieldsInfo = function () {
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const Proveedor = model("proveedores", Proveedores_Schema);

module.exports = Proveedor;
