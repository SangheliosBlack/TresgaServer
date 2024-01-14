"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PrivilegiosSchema = Schema({
    seccion: {
        type: String,
        required: true
    },
    permiso: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("privilegios", PrivilegiosSchema);
