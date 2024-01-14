"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ClienteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    dom_1: {
        type: String,
        required: true
    },
    dom_2: {
        type: String,
        require: false
    },
    rfc: {
        type: String,
        required: false
    },
    contacto: {
        type: String,
        required: false
    },
    numero: {
        type: String,
        required: false
    },
    correo: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = model("Cliente", ClienteSchema);
