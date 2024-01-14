"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const EmpleadoSchema = Schema({
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

module.exports = model("Empleado", EmpleadoSchema);
