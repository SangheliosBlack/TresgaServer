const mongoose = require("mongoose");
const { Schema, model } = mongoose

const Ruta_Schema = Schema({
    codigo: {
        type: String,
        required: true
    },
    cliente: {
        type: String,
        required: true
    },
    origen: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    producto: {
        type: String,
        required: true
    },
    comision: {
        type: String,
        required: true
    },
    unidad: {
        type: String,
        required: true
    },
    remolque: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

Ruta_Schema.statics.getFieldsInfo = function () {
    console.log("HOLA");
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const Ruta = model("rutas", Ruta_Schema);

module.exports = Ruta;
