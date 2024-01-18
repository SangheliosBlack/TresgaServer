const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Tanque_Schema = Schema({
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
    capacidad: {
        type: String,
        required: true
    },
    dimensiones: {
        type: String,
        required: true
    },
    suspension: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

Tanque_Schema.statics.getFieldsInfo = function () {
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const Tanque = model("tanques", Tanque_Schema);

module.exports = Tanque;

