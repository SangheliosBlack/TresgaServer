"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PuntosDescargaSchema = Schema({
    destino: {
        type: String,
        required: true
    },
    dir_1: {
        type: String,
        required: true
    },
    dir_2: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model("Puntos_Descarga", PuntosDescargaSchema);
