"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TanqueSchema = Schema({
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

module.exports = model("Tanque", TanqueSchema);
