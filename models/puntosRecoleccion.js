const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Puntos_Recoleccion_Schema = Schema({
    origen: {
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

Puntos_Recoleccion_Schema.statics.getFieldsInfo = function () {
    return Object.keys(this.schema.paths)
        .map(field => ({
            name: field,
            properties: this.schema.paths[field]
        }));
};

const Punto_Recoleccion = model("puntos_recoleccions", Puntos_Recoleccion_Schema);

module.exports = Punto_Recoleccion;

