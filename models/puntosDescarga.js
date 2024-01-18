const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Puntos_Descarga_Schema = Schema({
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

Puntos_Descarga_Schema.statics.getFieldsInfo = function () {
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const Punto_Descarga = model("puntos_descarga", Puntos_Descarga_Schema);

module.exports = Punto_Descarga;
