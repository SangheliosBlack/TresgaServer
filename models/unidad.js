const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Unidad_Schema = Schema({
    unidad: {
        type: String,
        required: true
    },
    placas: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    serie: {
        type: String,
        required: true
    },
    motor: {
        type: String,
        required: true
    },
    detalle: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    clase: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

Unidad_Schema.statics.getFieldsInfo = function () {
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const Unidad = model("unidades", Unidad_Schema);

module.exports = Unidad;