"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UnidadSchema = Schema({
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

module.exports = model("Unidad", UnidadSchema);