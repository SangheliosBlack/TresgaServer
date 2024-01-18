"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Cliente_Schema = Schema({
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
        required: false
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

Cliente_Schema.statics.getFieldsInfo = function () {
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const Cliente = model("clientes", Cliente_Schema);

module.exports = Cliente;
