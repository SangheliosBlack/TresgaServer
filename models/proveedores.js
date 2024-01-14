"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProveedorSchema = Schema({
    nombre: {
        type: String,
        required: false
    },
    rfc: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: false
    },
    contacto: {
        type: String,
        required: false
    },
    correo: {
        type: String,
        required: false
    },
    banco: {
        type: String,
        required: false
    },
    clabe_inter: {
        type: String,
        required: false
    },
    dom_1: {
        type: String,
        required: false
    },
    plazo: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("proveedores", ProveedorSchema);
