"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RutaSchema = Schema({
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

module.exports = model("Ruta", RutaSchema);
