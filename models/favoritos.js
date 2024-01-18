"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

var Favorito_Schema = Schema({
    titulo: {
        type: String,
        required: true
    },
    enlace: {
        type: String,
        required: true
    },
    icono: {
        type: String,
        required: true
    }
});
Favorito_Schema.statics.getFieldsInfo = function () {
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const Favorito = model("favoritos", Favorito_Schema);

module.exports = Favorito;
