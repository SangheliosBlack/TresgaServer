"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FavoritosSchema = Schema({
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

module.exports = mongoose.model("favoritos", FavoritosSchema);
