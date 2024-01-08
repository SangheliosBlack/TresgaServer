"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ValeSchema = Schema({
    fecha: {
        type: String,
        required: true
    },
    folio: {
        type: String,
        required: true
    },
    producto: {
        type: String,
        required: true
    },
    importe: {
        type: Number,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    usado: {
        type: Boolean,
        required: true
    },
    tipo: {
        type: Boolean,
        required: true
    },
    cancelado: {
        type: Boolean,
        required: true
    },
    numero_rest: {
        type: Number,
        required: true
    },
    factura: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model("Vale", ValeSchema);