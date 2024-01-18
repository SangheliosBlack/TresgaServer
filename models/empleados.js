"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Empleado_Schema = Schema({
    nombre: {
        type: String,
        required: true
    },
    rfc: {
        type: String,
        required: true
    },
    curp: {
        type: String,
        required: true
    },
    seguro: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    posicion: {
        type: String,
        required: true
    },
    domicilio: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


Empleado_Schema.statics.getFieldsInfo = function () {
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const Empleado = model("empleados", Empleado_Schema);

module.exports = Empleado;

